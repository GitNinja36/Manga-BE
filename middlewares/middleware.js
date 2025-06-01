const express = require('express');
const cors = require('cors');

const authRouter = require("../routers/userRouter.js");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/v1/user", authRouter); 

module.exports = app;