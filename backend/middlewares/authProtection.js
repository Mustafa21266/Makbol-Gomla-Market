// Checks if user is authenticated or not 

const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const User = require('../models/user');
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;
    // console.log(token);
    // if(!token){
    //     return next(new ErrorHandler("Unauthorized action! Login first to access",401))
    // }
    const decoded = jwt.verify(token, "3e0586af827487edbd7449b7d3ea358aed556a8c0f546eeb3e1373b5af1ed586a43d1d0dcb44bc1d44dade69bd857d008f5cc9cf15876867a05705dbb44a7394a2ccea3cb5a3239758b6485d71f6e37f10ba95fe71bcca9d61e357d91b0811c781115acb239942fd0faf7b7fe3bf5d7d60974a6fd70efa6a91885b4cafc4700f29af6526cf5c46c855f5df86b222b6ec82ad0f0b743f6fd9e5b17ace65fce6814e19c56159552e91780e86921a07befa367985da34d001787f807bb69898270a1cfe306af87a036a69dad649ddb1dfc2942f132ec640d14409d7b1258e4b009337305a6139bcdcecfc02dbcb044c8d9d66b5b3432e43fc2568b0ae0411cddf81")
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