const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['buyer', 'seller', 'admin'], default: 'buyer' },
  avatar: { 
    type: String ,
    default : "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740",
  },
  address: {
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String,
  },
  cart:[
    {
      type : mongoose.Types.ObjectId,
      ref : "books",
    }
  ],
  createdAt: { 
    type: Date, default: Date.now 
  },
  orders: [
    {
      type : mongoose.Types.ObjectId,
      ref : "order",
    },
  ],
});

module.exports = mongoose.model('User', userSchema);