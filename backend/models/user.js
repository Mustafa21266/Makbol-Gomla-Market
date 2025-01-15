const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter a name"],
        maxLength: [30, "Name cannot exceed 30 characters"]
    },
    phoneNo: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, "Please Enter an email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid email!"]
    },
    password: {
        type: String,
        required: [true, "Please Enter a password"],
        minlength: [6, "Password cannot be less than 6 characters!"],
        select: false
    },
    balance: {
        type: Number,
        required: [true, "Please enter user balance"],
        default: 0.0
    },
    avatar: {
            public_id: {
                type: String,
                required: false
            },
            url: {
                type: String,
                required: false
            }
        },
    role: {
        type: String,
        required: [true, "Please Enter a role"],
        enum: {
            values: [
                'user',
                'seller',
                'admin',
                ],
            message: "Please select correct role"
        },
        default: 'user'
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,

})

//Password Encryption before saving
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
})
//Compare user password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}
// Return JWT Token
userSchema.methods.getJwtToken = function(){
    return jwt.sign({ id: this._id }, "3e0586af827487edbd7449b7d3ea358aed556a8c0f546eeb3e1373b5af1ed586a43d1d0dcb44bc1d44dade69bd857d008f5cc9cf15876867a05705dbb44a7394a2ccea3cb5a3239758b6485d71f6e37f10ba95fe71bcca9d61e357d91b0811c781115acb239942fd0faf7b7fe3bf5d7d60974a6fd70efa6a91885b4cafc4700f29af6526cf5c46c855f5df86b222b6ec82ad0f0b743f6fd9e5b17ace65fce6814e19c56159552e91780e86921a07befa367985da34d001787f807bb69898270a1cfe306af87a036a69dad649ddb1dfc2942f132ec640d14409d7b1258e4b009337305a6139bcdcecfc02dbcb044c8d9d66b5b3432e43fc2568b0ae0411cddf81", {
        expiresIn: "7d" 
    })
}
//Geenerate password reset token
userSchema.methods.getResetPasswordToken = function(){
    //Generate token
    const resetToken = crypto.randomBytes(20).toString('hex');
    //Hash and set to resetPasswordToken
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    //set token expiry time
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;
    return resetToken
}
module.exports = mongoose.model('User', userSchema);