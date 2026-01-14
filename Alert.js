const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['sos', 'police', 'patrol'], required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  message: String,
  status: { type: String, enum: ['pending', 'sent', 'resolved'], default: 'pending' },
  emergencyContactsNotified: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

module.exports = mongoose.model('Alert', alertSchema);
