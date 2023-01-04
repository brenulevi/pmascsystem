const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: String,
  code: String,
  group: String,
  brand: String,
  qtd: Number,
  qtdType: String,
  size: Map,
  localization: String,
  createdAt: Date,
});

module.exports = mongoose.model('Product', ProductSchema, 'products');