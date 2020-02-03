const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  street: { type: String, required: true },
  number: { type: Number, required: true },
  declaration: { type: Number, required: true },
  residence: { type: Number, required: true },
  difference: { type: Number, required: true }
});

dataSchema.index({ street: 1, number: 1}, { unique: true });

module.exports = mongoose.model('Data', dataSchema);