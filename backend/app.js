//Set up the app & express
const express = require("express");
const app = express();
app.use(express.json());
// const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const cloudinary  = require('cloudinary');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const errorMiddleWare = require('./middlewares/errors.js');
const path = require('path')
///////////////////////////dotenv config
if(process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').dotenv.config({path: "backend/config/config.env"})
//middlewares
app.use(errorMiddleWare);
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(fileUpload());
//Setting up cloudinary config

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

//Import all routes

const products = require("./routes/product");
const auth = require("./routes/auth");
const payment = require("./routes/payment");
const order = require("./routes/order");

app.use('/api/v1', products);
app.use('/api/v1', auth);
app.use('/api/v1', payment);
app.use('/api/v1', order);

if(process.env.NODE_ENV === 'PRODUCTION'){
    app.use(express.static(path.join(__dirname, '../frontend/build')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
    })
}


module.exports = app;