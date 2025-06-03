const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
  url :{
    type: String, 
    required: true 
  },
  title: { 
    type: String, 
    required: true 
  },
  description: String,
  author: String,
  genre: [String],
  language: { 
    type: String,
    default: 'English' 
  },
  price: { 
    type: Number, 
    required: true 
  },
  stock: { 
    type: Number, 
    default: 200 
  },
  coverImage: String,
  images: [String],
  seller: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  rating: { 
    type: Number, 
    default: 0 
  },
  reviewsCount: { 
    type: Number, 
    default: 0 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  }
);

module.exports = mongoose.model('Books', bookSchema);