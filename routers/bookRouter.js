const express = require("express");
const { 
    addBook,
    updateBook, 
    deleteBook, 
    getBook, 
    getRecentBook, 
    getBookId, 
    addBulkManga, 
    getRandomBook 
    } = require("../controllers/bookController");

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
router.get("/all", getBook);

//get recently added books 5
router.get("/recent/:limit", getRecentBook);

//get book by id
router.get("/:id", getBookId);

//get randome
router.get("/random", getRandomBook);

module.exports = router;