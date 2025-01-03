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
    // const paymentIntent = await stripe.paymentIntents.create({
    //     amount: req.body.amount,
    //     currency: 'usd',

    //     metadata: { integration_check: 'accept_a_payment'}
    // })
    res.status(200).json({
        success: true,
        client_secret: "3e0586af827487edbd7449b7d3ea358aed556a8c0f546eeb3e1373b5af1ed586a43d1d0dcb44bc1d44dade69bd857d008f5cc9cf15876867a05705dbb44a7394a2ccea3cb5a3239758b6485d71f6e37f10ba95fe71bcca9d61e357d91b0811c781115acb239942fd0faf7b7fe3bf5d7d60974a6fd70efa6a91885b4cafc4700f29af6526cf5c46c855f5df86b222b6ec82ad0f0b743f6fd9e5b17ace65fce6814e19c56159552e91780e86921a07befa367985da34d001787f807bb69898270a1cfe306af87a036a69dad649ddb1dfc2942f132ec640d14409d7b1258e4b009337305a6139bcdcecfc02dbcb044c8d9d66b5b3432e43fc2568b0ae0411cddf81"
    })

})


//Send stripe API KEY      =>      /api/v1/stripeapi
exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY
    })

})