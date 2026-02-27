require('dotenv').config();
const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const db = require('./config/db');
const { connect: connectMongo } = require('./config/mongo');

const authRoutes = require('./routes/auth');
const projectsRoutes = require('./routes/projects');
const uploadRoutes = require('./routes/upload');

const PORT = process.env.PORT || 4000;
const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ensure local storage dirs exist for dev
const uploadsDir = path.join(__dirname, 'uploads');
const tempDir = path.join(__dirname, 'temp');
[uploadsDir, tempDir].forEach((d) => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

// connect to MongoDB if provided
connectMongo().catch((err) => {
  console.error('Failed to connect to MongoDB:', err);
  // continue; application can still run and may use other storages
});

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/upload', uploadRoutes);

// health
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`ContextHub backend listening on port ${PORT}`);
});
