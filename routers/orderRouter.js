const express = require("express");
const {
  placeOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");
const { authenticateToken } = require("../middlewares/UserAuth");

const router = express.Router();

// Place a new order
router.post("/place", authenticateToken, placeOrder);

// Get all orders of the logged-in user
router.get("/my-orders", authenticateToken, getUserOrders);

// Admin: Get all orders
// Add admin auth middleware if needed
router.get("/all", getAllOrders); 

// Admin: Update order status
// Add admin auth middleware if needed
router.put("/update-status", updateOrderStatus); 

module.exports = router;