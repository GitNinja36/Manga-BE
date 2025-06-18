const express = require("express");
const {newPayment} = require('../controllers/paymentController.js');
const router = express.Router();

router.post('/create-payment-intent', newPayment);

module.exports = router;