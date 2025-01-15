//Create and send token and save in the cookie
const sendToken = (user, statusCode, res)=> {
    //get JWT TOKEN from user
    const token = user.getJwtToken();

    // Options for cookie
    const options = {
        expires: new Date(Date.now() + 30000 * 24 * 60 * 60 * 1000)
    }
    res.status(statusCode).cookie('token',token, options).json({
        success: true,
        token,
        user
    })
}

module.exports = sendToken;