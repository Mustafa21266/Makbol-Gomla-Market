const Order = require('../models/order');
const Product = require('../models/product');
const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures.js');
const order = require('../models/order');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)


//Process stripe payments      =>      /api/v1/payment/process
exports.processPayments = catchAsyncErrors(async (req, res, next) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'usd',

        metadata: { integration_check: 'accept_a_payment'}
    })
    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret
    })

})


//Send stripe API KEY      =>      /api/v1/stripeapi
exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY
    })

})