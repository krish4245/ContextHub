const { Schema, model, Types } = require('mongoose');

const VersionSchema = new Schema({
  project_id: { type: Types.ObjectId, ref: 'Project', required: true },
  version_number: { type: Number, required: true },
  file_path: { type: String },
  created_at: { type: Date, default: Date.now }
});

module.exports = model('Version', VersionSchema);
