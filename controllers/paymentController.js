const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// payment controller
const newPayment = async (req, res) => {
  const { amount } = req.body; // Amount in rupees

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe takes paise
      currency: 'inr',
      automatic_payment_methods: { enabled: true },
    });

    res.status(200).send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Payment intent creation failed:', error);
    res.status(500).json({ message: 'Payment intent creation failed' });
  }
};

module.exports = {newPayment};