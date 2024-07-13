const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  company:{ type: String },
  number:{type:Number},
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Person', personSchema);
