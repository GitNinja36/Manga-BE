const Cart = require('../models/Cart');
const Books = require('../models/Books');
const User = require('../models/Users');

// Add item to cart
const addToCart = async (req, res) => {
  try {
    const { mangaId, quantity } = req.body;
    const { id } = req.headers;

    let cart = await Cart.findOne({ user: id });

    if (!cart) {
      cart = new Cart({
        user: id,
        items: [{ manga: mangaId, quantity }],
      });
    } else {
      const itemIndex = cart.items.findIndex(item => item.manga.toString() === mangaId);
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
  try {
    const { id } = req.headers;

    const cart = await Cart.findOne({ user: id }).populate("items.manga");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error("Get cart error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  try {
    const { mangaId } = req.body;
    const { id } = req.headers;

    const cart = await Cart.findOne({ user: id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(item => item.manga.toString() !== mangaId);
    cart.updatedAt = Date.now();
    await cart.save();

    res.status(200).json({ message: "Item removed", cart });
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