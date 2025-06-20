const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  manga: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Books' 
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  rating: { 
    type: Number, 
    min: 1, 
    max: 5 
  },
  comment: String,
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
});

module.exports = mongoose.model('Review', reviewSchema);