const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || process.env.DATABASE_URL;

async function connect() {
  if (!MONGODB_URI) {
    console.warn('No MONGODB_URI provided — skipping MongoDB connection');
    return;
  }
  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: process.env.MONGO_DB_NAME || undefined,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
  }
}

module.exports = { connect, mongoose };
