const express = require("express");
const { authenticateToken } = require("../middlewares/UserAuth");
const { addReview, getReviews } = require("../controllers/reviewController");

const router = express.Router();

// Add review
router.post("/add", authenticateToken, addReview);

// Get reviews for a manga
router.get("/:mangaId", getReviews);

module.exports = router;