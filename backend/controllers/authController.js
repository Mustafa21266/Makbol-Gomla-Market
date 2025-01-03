const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures.js');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const { updateSingleProduct } = require('./productController');
const cloudinary = require('cloudinary');

function makeEmail() {
    var strValues = "abcdefg12345";
    var strEmail = "";
    var strTmp;
    for (var i = 0; i < 10; i++) {
        strTmp = strValues.charAt(Math.round(strValues.length * Math.random()));
        strEmail = strEmail + strTmp;
    }
    strTmp = "";
    strEmail = strEmail + "@";
    for (var j = 0; j < 8; j++) {
        strTmp = strValues.charAt(Math.round(strValues.length * Math.random()));
        strEmail = strEmail + strTmp;
    }
    strEmail = strEmail + ".com"
    return strEmail;
}

//Register a new user      =>   /api/v1/register

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const result = await cloudinary.v2.uploader.upload('https://static.thenounproject.com/png/4154905-200.png', {
        folder: 'avatars',
        width: 250,
        crop: 'scale'
    })
    const { name, phoneNo, password } = req.body
    const email = makeEmail()
    console.log(result)
    const user = await User.create({
        name,
        phoneNo,
        email,
        password,
        avatar: {
            public_id: result.public_id,
            url: result.secure_url
        }
    });
    sendToken(user, 200, res)
    // const token = user.getJwtToken();
    // res.status(201).json({
    //     success: true,
    //     token,
    //     // user
    // })
})

//Login user      =>   /api/v1/login
exports.loginUser = catchAsyncErrors(async(req, res, next) => {
    const { phoneNo, password } = req.body;
    //checks if email and password entered by user
    if(!phoneNo || !password){
        return next(new ErrorHandler("من فضلك إدخل رقم التليفون وكلمة المرور ! ", 400));
    }

    //Finding user in database
    const user = await User.findOne({phoneNo}).select("+password")

    if(!user){
        return next(new ErrorHandler("رقم تليفون او كلمة سر خاطئين !", 401));
    }

    //Checks if password correct or not
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("رقم تليفون او كلمة سر خاطئين !", 401));
    }
    sendToken(user, 200, res)
    // const token = user.getJwtToken();
    // res.status(200).json({
    //     success: true,
    //     token,
    //     // user
    // })
})
//Forgot Password       =>    /api/v1/password/forgot

exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if(!user){
        return next(new ErrorHandler("No User has been found with this email", 404));
    }
    //Get reset token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    //Create reset password URL
    const resetURL = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`
    // const resetURL = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`
    const message = `Your password reset URL is:\n\n${resetURL}\n\nif you haven't requested a password reset please ignore this email!`;
    try {
        await sendEmail({
            email: user.email,
            subject: 'E-Commerce Website Password Reset!',
            message
        })
        res.status(200).json({
            success: true,
            message: `Password Reset Email Successfully Sent To ${user.email}`
        })
        
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message, 500))
    }

})

//Logout user       =>    /api/v1/logout
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: "تم تسجيل الخروج بنجاح ! "
    })

})
//Reset Password       =>    /api/v1/password/reset/:token

exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    //HASH URL Token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })
    if(!user){
        return next(new ErrorHandler("Reset Password Token is invalid or expired", 400))
    }
    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("Passwords Don't Match!", 400))
    }
    //Setup new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    sendToken(user, 200, res);
})

//Get currently logged in user details      =>  /api/v1/me
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user
    })
})

//Update / Change Password       =>  /api/v1/password/update
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");
    //Check Previous User Password
    const isMatched = await user.comparePassword(req.body.oldPassword)
    if(!isMatched){
        return next(new ErrorHandler("كلمة المرور القديمة غير صحيحة !", 400))
    }
    user.password = req.body.password;
    await user.save();
    sendToken(user, 200, res);
})

//Update user profile       =>  /api/v1/me/update
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        phoneNo: req.body.phoneNo,
        email: req.body.email,

    }
    //Update Avatar: TODO
    if(req.body.avatar !== ''){
        const user = await User.findById(req.user.id)
        const image_id = user.avatar.public_id
        const res = await cloudinary.v2.uploader.destroy(image_id)
        const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: 'avatars',
            width: 150,
            crop: 'scale'
        })
        newUserData.avatar = {
            public_id: result.public_id,
            url: result.secure_url
        }
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({
        success: true,
        message: "Profile Updated Successfully!"
    })
})

//////////////////////ADMIN ROUTES///////////////

//Get all users     =>      /api/v1/admin/users
exports.allUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find()
    res.status(200).json({
        success: true,
        users
    })
})

//Get user details     =>      /api/v1/admin/user/:id
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id)
    if(!user){
        return next(new ErrorHandler(`لم يتم العثور علي مستخدم بالكود :  ${req.params.id}`, 404))
    }
    res.status(200).json({
        success: true,
        user
    })
})

//Update user profile       =>  /api/v1/admin/user/:id
exports.updateUser = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        phoneNo: req.body.phoneNo,
        email: req.body.email,
        role: req.body.role
    }
    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({
        success: true,
        message: "تم تحديث بيانات الحساب بنجاح !"
    })
})

//Delete user     =>      /api/v1/admin/user/:id
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id)
    if(!user){
        return next(new ErrorHandler(`لم يتم العثور علي مستخدم بالكود : ${req.params.id}`, 404))
    }
    //Remove avatar: TODO
    const image_id = user.avatar.public_id
    await cloudinary.v2.uploader.destroy(image_id)
    await user.remove();
    res.status(200).json({
        success: true,
        message: "تم إلغاء المستخدم بنجاح !"
    })
})