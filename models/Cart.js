const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      manga: { type: mongoose.Schema.Types.ObjectId, ref: 'Books' },
      quantity: { type: Number, default: 1 },
    }
  ],
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Cart', cartSchema);