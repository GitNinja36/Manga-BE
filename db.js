const mongoose = require('mongoose');

const connection = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB connected")
    } catch(err){
        console.error(err);
    }
};

connection();