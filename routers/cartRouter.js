const express = require("express");
const { authenticateToken } = require("../middlewares/UserAuth");
const { addToCart, getCart, removeFromCart } = require("../controllers/cartController");

const router = express.Router();

// Add to cart
router.post("/add", authenticateToken, addToCart);

// Get cart items
router.get("/all", authenticateToken, getCart);

// Remove from cart
router.delete("/remove", authenticateToken, removeFromCart);

module.exports = router;