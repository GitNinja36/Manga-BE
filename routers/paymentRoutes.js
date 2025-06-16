const express = require("express");
const {paymentRoutes} = require('../controllers/paymentController.js');
const router = express.Router();

router.post('/new', paymentRoutes);

module.exports = router;