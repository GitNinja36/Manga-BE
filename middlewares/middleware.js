const express = require('express');
const cors = require('cors');

const authRouter = require("../routers/userRouter.js");
const bookRouter = require("../routers/bookRouter.js");
const cartRouter = require("../routers/cartRouter.js");
const reviewRouter = require("../routers/reviewRouter.js");
const orderRouter = require("../routers/orderRouter.js");
const paymentRoutes = require("../routers/paymentRoutes.js");
const aiRoutes = require('../routers/ai.js');

const app = express();
app.use(cors());
app.use(express.json());

app.use("/v1/user", authRouter); 
app.use("/v1/book", bookRouter); 
app.use("/v1/cart", cartRouter);
app.use("/v1/review", reviewRouter);
app.use("/v1/order", orderRouter);
app.use('/v1/payment', paymentRoutes);
app.use('/v1/ai', aiRoutes);

module.exports = app;