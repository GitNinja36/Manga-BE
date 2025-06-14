const express = require("express");
const { authenticateToken } = require("../middlewares/UserAuth");
const { addReview, getReviews, getAllReviews } = require("../controllers/reviewController");

const router = express.Router();

// GET all reviews (global)
router.get('/all', getAllReviews);

// Add review
router.post("/add", authenticateToken, addReview);

// Get reviews for a manga
router.get("/:mangaId", getReviews);


module.exports = router;