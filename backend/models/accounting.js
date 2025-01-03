const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const accountingSchema = new mongoose.Schema({
    receivables: {
        type: Number,
        required: [true, "Please enter user balance"],
        default: 0.0
    },
    returns: {
        type: Number,
        required: [true, "Please enter user balance"],
        default: 0.0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
})


module.exports = mongoose.model('Accounting', accountingSchema);