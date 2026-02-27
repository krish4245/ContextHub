const { Schema, model, Types } = require('mongoose');

const ContextSchema = new Schema({
  version_id: { type: Types.ObjectId, ref: 'Version', required: true },
  generated_text: { type: String },
  prompts: { type: [String], default: [] },
  created_at: { type: Date, default: Date.now }
});

module.exports = model('Context', ContextSchema);
