const User = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//signUp Controller
const signUpController = async (req, res) =>{
    try {
        const {username, email, password, address, avatar, role} = req.body;

        if(username.length < 4){
            return res
                .status(400)
                .json({message : "Username length should be greater than 3"});
        }

        //check username already exists
        const existingUsername = await User.findOne({username : username});;
        if(existingUsername){
            return res
                .status(400)
                .json({message : "Username already exists"});
        }

        //check username already exists
        const existingEmail = await User.findOne({email : email});;
        if(existingEmail){
            return res
                .status(400)
                .json({message : "Email already exists"});
        }

        if(password.length <= 5){
            return res
                .status(400)
                .json({message : "Password length should be greater than 5"});
        }

        const hashPass = await bcrypt.hash(password, 10);

        const newUser = new User({
            username : username,
            email : email,
            password : hashPass,
            avatar : avatar,
            address : address,
            role : role
        });
        await newUser.save();
        return res
            .status(200)
            .json({message : "SignUp Successfully"});
    } catch (error) {
        res.status(500).json({message : "Internal server error"})
    }
}

//signIn Controller
const signInController = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ username });
        if (!existingUser) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate token
        const token = jwt.sign(
            { id: existingUser._id, role: existingUser.role },
            "itachi",
            { expiresIn: "30D" }
        );

        // Respond with user info and token
        res.status(200).json({
            id: existingUser._id,
            role: existingUser.role,
            token: token
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

//get user-form
const getUserInfo = async (req, res) =>{
    try {
        const {id} =req.headers;
        const data = await User.findById(id).select('-password');
        return res.status(200).json(data);
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// update the user details 
const updateUserInfo = async (req, res) =>{
    try {
        const {id} =req.headers;
        const {address, avatar} = req.body || { };
        await User.findByIdAndUpdate(id, {address :address , avatar : avatar});
        return res.status(200).json({message : "User info updated successfully"});
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    signUpController, 
    signInController,
    getUserInfo,
    updateUserInfo
};