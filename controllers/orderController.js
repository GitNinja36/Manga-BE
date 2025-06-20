const Order = require('../models/Order');
const Books = require('../models/Books');
const User = require('../models/Users');
const Cart = require('../models/Cart')

// Place a new order
const placeOrder = async (req, res) => {
  try {
    const { id } = req.headers;
    const { shippingAddress, paymentMethod } = req.body;
    const cart = await Cart.findOne({ user: id }).populate('items.manga');
    if (!cart || !cart.items || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }
    const validItems = cart.items.filter(item => item.manga && item.manga._id);

    if (validItems.length === 0) {
      return res.status(400).json({ message: "No valid items in cart" });
    }
    const books = validItems.map(item => ({
      manga: item.manga._id,
      quantity: item.quantity,
      priceAtPurchase: item.manga.price,
    }));
    const newOrder = new Order({
      user: id,
      books,
      shippingAddress,
      paymentMethod,
    });
    await newOrder.save();
    cart.items = [];
    await cart.save();

    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error("Place order error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//direct buy
const placeDirectOrder = async (req, res) => {
  try {
    const { directBuy, qty, amount, paymentIntentId } = req.body;
    const userId = req.user.id;

    if (!directBuy || !qty || !amount || !paymentIntentId) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const user = await User.findById(userId);

    const book = await Books.findById(directBuy);
    if (!book) return res.status(404).json({ message: "Book not found" });

    const orderItem = {
      bookId: book._id,
      quantity: qty,
      price: book.price,
    };

    const newOrder = {
      items: [orderItem],
      amount,
      paymentIntentId,
      date: new Date(),
    };

    user.orders.push(newOrder);
    await user.save();

    return res.status(200).json({ message: "Direct order placed", order: newOrder });
  } catch (err) {
    console.error("Error placing direct order:", err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};


// Get all orders of a user
const getUserOrders = async (req, res) => {
  try {
    const { id } = req.headers;

    const orders = await Order.find({ user: id })
    .populate("books.manga")
    .populate("user", "username email");

    res.status(200).json(orders);
  } catch (error) {
    console.error("Get user orders error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all orders (admin purpose)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("books.manga")
      .populate("user", "username email");

    res.status(200).json(orders);
  } catch (error) {
    console.error("Get all orders error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const {id : orderId } = req.params;
    console.log(orderId)

    const validStatuses = ['processing', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    ).populate("books.manga");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order status updated", order });
  } catch (error) {
    console.error("Update order status error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const moveCartToOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const { paymentIntentId, amount } = req.body;
    const cart = await Cart.findOne({ user: userId }).populate("items.manga");
    if (!cart || !cart.items || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const orderItems = cart.items.map(item => ({
      bookId: item.manga._id,
      quantity: item.quantity,
      price: item.manga.price,
    }));

    const newOrder = {
      items: orderItems,
      amount,
      paymentIntentId,
      date: new Date(),
    };

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.orders.push(newOrder);
    user.cart = [];
    await user.save();

    res.status(200).json({ message: "Order placed successfully", order: newOrder });
  } catch (err) {
    console.error("Error moving cart to orders:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  placeOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
  moveCartToOrders,
  placeDirectOrder
};