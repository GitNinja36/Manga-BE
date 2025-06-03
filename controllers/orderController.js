const Order = require('../models/Order');
const Books = require('../models/Books');
const User = require('../models/Users');

// Place a new order
const placeOrder = async (req, res) => {
  try {
    const { books, shippingAddress, paymentMethod } = req.body;
    const { id } = req.headers;

    if (!books || books.length === 0) {
      return res.status(400).json({ message: "No books provided in the order" });
    }

    const newOrder = new Order({
      user: id,
      books,
      shippingAddress,
      paymentMethod,
    });

    await newOrder.save();

    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error("Place order error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all orders of a user
const getUserOrders = async (req, res) => {
  try {
    const { id } = req.headers;

    const orders = await Order.find({ user: id }).populate("books");

    res.status(200).json(orders);
  } catch (error) {
    console.error("Get user orders error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all orders (admin purpose)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("books user", "username email");

    res.status(200).json(orders);
  } catch (error) {
    console.error("Get all orders error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    const validStatuses = ['processing', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    ).populate("books");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order status updated", order });
  } catch (error) {
    console.error("Update order status error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  placeOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
};