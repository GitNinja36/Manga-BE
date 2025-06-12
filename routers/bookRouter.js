const express = require("express");
const { addBook, updateBook, deleteBook, getBook, getRecentBook, getBookId, addBulkManga } = require("../controllers/bookController");
const { authenticateToken } = require("../middlewares/UserAuth");
const router = express.Router();

//add new book
router.post("/add",authenticateToken, addBook);

// Add book in bulk
router.post('/add-bulk', addBulkManga);

//update new book
router.put("/update",authenticateToken, updateBook);

//delete new book
router.delete("/delete", authenticateToken, deleteBook);

//get all book
router.get("/all", authenticateToken, getBook);

//get recently added books 5
router.get("/recent/:limit", authenticateToken, getRecentBook);

//get book by id
router.get("/:id", authenticateToken, getBookId);

module.exports = router;