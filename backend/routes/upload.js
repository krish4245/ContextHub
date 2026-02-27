const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const AdmZip = require('adm-zip');
const auth = require('../middleware/auth');
const contextGenerator = require('../services/contextGenerator');
const Project = require('../models/Project');
const Version = require('../models/Version');
const Context = require('../models/Context');

const router = express.Router();
router.use(auth);

const tempDir = path.join(__dirname, '..', 'temp');
const uploadsDir = path.join(__dirname, '..', 'uploads');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, tempDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${uuidv4()}-${file.originalname}`)
});

const upload = multer({ storage, limits: { fileSize: 50 * 1024 * 1024 } });

router.post('/:projectId', upload.single('file'), async (req, res) => {
  const { projectId } = req.params;
  const file = req.file;
  if (!file) return res.status(400).json({ error: 'No file uploaded' });

  try {
    // validate project ownership
    const project = await Project.findOne({ _id: projectId, user_id: req.user.id }).exec();
    if (!project) return res.status(404).json({ error: 'Project not found' });
    const uploadId = uuidv4();
    const extractDir = path.join(tempDir, `extracted-${uploadId}`);
    fs.mkdirSync(extractDir, { recursive: true });

    // unzip
    const zip = new AdmZip(file.path);
    zip.extractAllTo(extractDir, true);

    // generate context (markdown + suggested prompts)
    const gen = await contextGenerator.generateContext(extractDir);
    const markdown = typeof gen === 'string' ? gen : gen.markdown;
    const prompts = gen && gen.prompts ? gen.prompts : [];

    // determine next version number
    const last = await Version.find({ project_id: projectId }).sort({ version_number: -1 }).limit(1).exec();
    const nextVersion = last && last.length ? last[0].version_number + 1 : 1;

    // move original zip to uploads with a unique filename
    const savedName = `${Date.now()}-${uploadId}-${file.originalname}`;
    const destPath = path.join(uploadsDir, savedName);
    fs.renameSync(file.path, destPath);

    const versionDoc = new Version({ project_id: projectId, version_number: nextVersion, file_path: destPath });
    await versionDoc.save();
    const ctxDoc = new Context({ version_id: versionDoc._id, generated_text: markdown, prompts });
    await ctxDoc.save();

    // cleanup extracted folder
    // (keep uploaded zip in uploads/ for now)
    fs.rmSync(extractDir, { recursive: true, force: true });

    res.json({ version: versionDoc, context: markdown, suggested_prompts: prompts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Upload failed' });
  }
});

module.exports = router;
