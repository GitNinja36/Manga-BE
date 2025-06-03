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
        const books = await Books.find().sort({createdAt : -1});
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
    getBookId
};