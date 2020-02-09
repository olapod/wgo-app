const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  ulica: { type: String, required: true },
  nr: { type: Number, required: true },
  osoby: { type: Number, required: true },
  meldunki: { type: Number, required: true },
  roznica: { type: Number, required: true }
});

dataSchema.index({ ulica: 1, nr: 1}, { unique: true });

module.exports = mongoose.model('Data', dataSchema);