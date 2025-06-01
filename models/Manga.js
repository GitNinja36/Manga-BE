const mongoose = require('mongoose');

const mangaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  author: String,
  genre: [String], // e.g. ['Action', 'Romance']
  language: { type: String, default: 'English' },
  price: { type: Number, required: true },
  stock: { type: Number, default: 1 },
  coverImage: String,
  images: [String], // Additional images
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, default: 0 },
  reviewsCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Manga', mangaSchema);