const Review = require('../models/Review');
const Books = require('../models/Books');

// Add a review
const addReview = async (req, res) => {
  try {
    const { mangaId, rating, comment } = req.body;
    const { id } = req.headers;

    const review = new Review({
      manga: mangaId,
      user: id,
      rating,
      comment,
    });

    await review.save();

    // Update book's rating and reviews count
    const reviews = await Review.find({ manga: mangaId });
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    await Books.findByIdAndUpdate(mangaId, {
      rating: avgRating,
      reviewsCount: reviews.length,
    });

    res.status(200).json({ message: "Review added", review });
  } catch (error) {
    console.error("Add review error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all reviews for a manga
const getReviews = async (req, res) => {
  try {
    const { mangaId } = req.params;

    const reviews = await Review.find({ manga: mangaId }).populate("user", "username avatar");

    res.status(200).json(reviews);
  } catch (error) {
    console.error("Get reviews error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addReview,
  getReviews,
};