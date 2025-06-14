const mongoose = require('mongoose'); 
const User = require('../models/Users');
const Books = require('../models/Books');
//add book
const addBook = async (req, res) =>{
    try {
        const {id} =req.headers;
        const user = await User.findById(id);
        if(user.role !== "seller"){
            res.status(500).json({message:"You dont have access to add new book"});
        }
        const book = new Books({
            url : req.body.url,
            title : req.body.title,
            description : req.body.description,
            genre : req.body.genre,
            language : req.body.language,
            price: req.body.price,
            coverImage : req.body.coverImage,
            images : req.body.images,
            seller : user._id
        })
        await book.save();
        res.status(200).json({message:"Book added successfully"});
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"});
    }
}

//bulk manga store
const addBulkManga = async (req, res) => {
    try {
      const { mangas } = req.body;
      if (!Array.isArray(mangas) || mangas.length === 0) {
        return res.status(400).json({ message: "No manga data provided" });
      }
      const adminId = new mongoose.Types.ObjectId("683de6d36c3e5a4bc2832825");
  
      const mangasWithSellerId = mangas.map(manga => ({
        ...manga,
        seller: adminId,
      }));
      const insertedMangas = await Books.insertMany(mangasWithSellerId);
      res.status(201).json({
        message: "Bulk manga inserted successfully",
        data: insertedMangas,
      });
    } catch (error) {
      console.error("Error inserting bulk manga:", error);
      res.status(500).json({ message: "Failed to insert bulk manga" });
    }
};

// update book
const updateBook = async (req, res) =>{
    try {
        const { bookid, id } =req.headers;
        const user = await User.findById(id);
        if( user.role != "seller"){
            res.status(500).json({message:"you can't change the value"});
        }else{
            await Books.findByIdAndUpdate(bookid, {
                url : req.body.url,
                title : req.body.title,
                description : req.body.description,
                genre : req.body.genre,
                language : req.body.language,
                price: req.body.price,
                coverImage : req.body.coverImage,
                images : req.body.images,
            });
            res.status(200).json({message:"Book updated successfully"});
        }
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"});
        console.log(error);
    }
}

// update book
const deleteBook = async (req, res) =>{
    try {
        const { bookid } =req.headers;
        await User.findByIdAndDelete(bookid);
        res.status(200).json({message:"Book deleted successfully"});
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"});
        console.log(error);
    }
}

// get book
const getBook = async (req, res) =>{
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 8; // 4 cols x 2 rows = 8
      const search = req.query.search || "";
      const genre = req.query.genre;
  
      const query = {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ],
      };
  
      if (genre) {
        query.genre = genre;
      }
  
      const skip = (page - 1) * limit;
      const books = await Books.find(query).skip(skip).limit(limit);
      const total = await Books.countDocuments(query);
  
      res.status(200).json({
        success: true,
        data: books,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
      });
    } catch (error) {
      console.error("Error in getAllBooksPaginated:", error);
      res.status(500).json({ success: false, message: "Failed to fetch books" });
    }
  };

// get recent book
const getRecentBook = async (req, res) =>{
    try {
        const {limit} = req.params;
        const books = await Books.find().sort({createdAt : -1}).limit(limit);
        return res.json({
            status : "Success",
            data : books,
        });
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"});
        console.log(error);
    }
}

// get recent book
const getBookId = async (req, res) =>{
    try {
        const {id} = req.params;
        const books = await Books.findById(id);
        return res.json({
            status : "Success",
            data : books,
        });
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"});
        console.log(error);
    }
}

module.exports = {
    addBook,
    updateBook,
    deleteBook,
    getBook,
    getRecentBook,
    getBookId,
    addBulkManga
};