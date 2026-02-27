const { Schema, model, Types } = require('mongoose');

const ProjectSchema = new Schema({
  user_id: { type: Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = model('Project', ProjectSchema);
