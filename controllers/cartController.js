const Cart = require('../models/Cart');
const Books = require('../models/Books');
const User = require('../models/Users');


// Add item to cart
const addToCart = async (req, res) => {
  try {
    const { mangaId } = req.body;
    const quantity = parseInt(req.body.quantity) || 1;
    const userId = req.headers.id;

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [{ manga: mangaId, quantity }],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.manga?.toString() === mangaId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ manga: mangaId, quantity });
      }
    }

    cart.updatedAt = Date.now();

    await cart.save();

    await User.findByIdAndUpdate(userId, {
      $addToSet: { cart: { manga: mangaId, quantity } },
    });

    res.status(200).json({ message: "Item added to cart", cart });
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

// Get user cart
const getCart = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const cartItems = await Cart.find({ user: req.user.id })
      .populate('items.manga')
      .skip(skip)
      .limit(limit);

    const total = await Cart.countDocuments({ user: req.user.id });

    res.status(200).json({
      success: true,
      data: cartItems.length > 0 ? cartItems[0].items : [],
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (error) {
    console.error("Get cart error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
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

    const itemIndex = cart.items.findIndex(
      item => item.manga?.toString() === mangaId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: `Manga (${mangaId}) not found in cart` });
    }

    if (cart.items[itemIndex].quantity > quantity) {
      cart.items[itemIndex].quantity -= quantity;
    } else {
      cart.items.splice(itemIndex, 1);
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