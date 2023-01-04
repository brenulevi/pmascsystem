const mongoose = require('mongoose');

const PatrimonySchema = new mongoose.Schema({
  name: String,
  code: String,
  object: String,
  model: String,
  process: String,
  brand: String,
  serie: String,
  property: String,
  cession: Date,
  garantee: Date,
  situation: String,
  localization: String,
  createdAt: Date,
});

module.exports = mongoose.model('Patrimony', PatrimonySchema, 'patrimonies');