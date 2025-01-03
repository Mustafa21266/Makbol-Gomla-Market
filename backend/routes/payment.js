const express = require("express");
const router = express.Router();
const { 
    processPayments,
    sendStripeApiKey
} = require('../controllers/paymentController');
const { isAuthenticatedUser } = require('../middlewares/authProtection');


router.route("/payment/process").post(processPayments)
router.route("/stripeapi").get(isAuthenticatedUser, sendStripeApiKey)

module.exports = router;