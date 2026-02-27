const express = require('express');
const auth = require('../middleware/auth');
const Project = require('../models/Project');
const Version = require('../models/Version');
const Context = require('../models/Context');

const router = express.Router();

router.use(auth);

router.get('/', async (req, res) => {
  try {
    const projects = await Project.find({ user_id: req.user.id }).sort({ created_at: -1 }).exec();
    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to list projects' });
  }
});

router.post('/', async (req, res) => {
  const { name, description } = req.body;
  if (!name) return res.status(400).json({ error: 'Name required' });
  try {
    const project = new Project({ user_id: req.user.id, name, description });
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findOne({ _id: id, user_id: req.user.id }).exec();
    if (!project) return res.status(404).json({ error: 'Not found' });
    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

router.get('/:id/context', async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findOne({ _id: id, user_id: req.user.id }).exec();
    if (!project) return res.status(404).json({ error: 'Project not found' });
    const latestVersion = await Version.find({ project_id: id }).sort({ created_at: -1 }).limit(1).exec();
    if (!latestVersion || latestVersion.length === 0) return res.json({ context: null });
    const ctx = await Context.findOne({ version_id: latestVersion[0]._id }).sort({ created_at: -1 }).exec();
    if (!ctx) return res.json({ context: null });
    res.json({ context: ctx });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch context' });
  }
});

module.exports = router;
