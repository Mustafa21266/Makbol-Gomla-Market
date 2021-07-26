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
    avatar: {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        },
    role: {
        type: String,
        required: [true, "Please Enter a role"],
        enum: {
            values: [
                'user',
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
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION_TIME 
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