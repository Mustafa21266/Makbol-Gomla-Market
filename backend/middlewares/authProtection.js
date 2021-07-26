// Checks if user is authenticated or not 

const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const User = require('../models/user');
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;
    // console.log(token);
    if(!token){
        return next(new ErrorHandler("Unauthorized action! Login first to access",401))
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id)
    next()
})
//Handling users roles
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Unauthorized action for Role: ${req.user.role}!`,403))
        }
        next()
    }
}
// catchAsyncErrors(async )