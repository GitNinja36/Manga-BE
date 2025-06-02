const express = require("express");
const {signUpController, getUserInfo, updateUserInfo, signInController} = require("../controllers/authController"); 
const { authenticateToken } = require("../middlewares/UserAuth");
const router = express.Router();

//Sign-Up
router.post("/signUp", signUpController);

//Sign-In
router.post("/signIn", signInController);

//get user information
router.get("/info", authenticateToken, getUserInfo);

//update the user information
router.put("/update", updateUserInfo);

module.exports = router;