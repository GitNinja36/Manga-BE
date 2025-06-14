const Cart = require('../models/Cart');
const Books = require('../models/Books');
const User = require('../models/Users');

// Add item to cart
const addToCart = async (req, res) => {
  try {
    const { mangaId } = req.body;
    const quantity = req.body.quantity || 1;
    const { id } = req.headers;

    let cart = await Cart.findOne({ user: id });

    if (!cart) {
      cart = new Cart({
        user: id,
        items: [{ manga: mangaId, quantity }],
      });
    } else {
      const itemIndex = cart.items.findIndex(item => item.manga?.toString() === mangaId);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ manga: mangaId, quantity });
      }
    }

    cart.updatedAt = Date.now();
    await cart.save();
    res.status(200).json({ message: "Item added to cart", cart });
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get user cart
const getCart = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const cartItems = await Cart.find({ userId: req.user.id }).skip(skip).limit(limit);
  const total = await Cart.countDocuments({ userId: req.user.id });

  res.status(200).json({
    success: true,
    data: cartItems,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
    totalItems: total,
  });
};

// Remove item from cart
const removeFromCart = async (req, res) => {
    try {
      const { mangaId, quantity = 1 } = req.body;
      const { id } = req.headers;
  
      const cart = await Cart.findOne({ user: id });
  
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }
  
      const itemIndex = cart.items.findIndex(item => item.manga?.toString() === mangaId);
  
      if (itemIndex === -1) {
        return res.status(404).json({ message: "Manga not found in cart" });
      }

      if (cart.items[itemIndex].quantity > quantity) {
        cart.items[itemIndex].quantity -= quantity;
      } else {
        cart.items.splice(itemIndex, 1); // remove item
      }
  
      cart.updatedAt = Date.now();
      await cart.save();
  
      res.status(200).json({ message: "Item updated/removed from cart", cart });
    } catch (error) {
      console.error("Remove from cart error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

module.exports = {
  addToCart,
  getCart,
  removeFromCart,
};