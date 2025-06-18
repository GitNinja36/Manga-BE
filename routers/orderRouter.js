const express = require("express");
const {
  placeOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
  moveCartToOrders,
  placeDirectOrder
} = require("../controllers/orderController");
const { authenticateToken } = require("../middlewares/UserAuth");

const router = express.Router();

// Place a new order
router.post("/place", authenticateToken, placeOrder);

// Get all orders of the logged-in user
router.get("/my", authenticateToken, getUserOrders);

// Get all orders
router.get("/all", getAllOrders); 

//Update order status
router.put("/update/:id", updateOrderStatus); 

router.post("/place-order", authenticateToken, moveCartToOrders);

router.post("/direct-buy", authenticateToken, placeDirectOrder); 

module.exports = router;