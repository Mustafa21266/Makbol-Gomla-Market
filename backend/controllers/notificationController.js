const Notification = require('../models/notification.js');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures.js');
const cloudinary = require('cloudinary')

// //create new product    => /api/v1/admin/product/new
// exports.newProduct = catchAsyncErrors(async (req, res, next) => {
//     let images = []
//     if(typeof req.body.images === 'string'){
//         images.push(req.body.images)
//     }else {
//         images = req.body.images
//     }
//     let imagesLinks = [];
//     for(let i = 0; i < images.length;i++){
//         const result = await cloudinary.v2.uploader.upload(images[i],{
//             folder: 'products'
//         })

//         imagesLinks.push({
//             public_id: result.public_id,
//             url: result.secure_url
//         })
//     }
//     req.body.images = imagesLinks;
//     req.body.user = req.user.id;
//     const product = await Product.create(req.body);
//     res.status(201).json({
//         success: true,
//         product
//     })
// })

//Get all notifications   =>     /api/v1/notifications
exports.getNotifications = catchAsyncErrors(async (req, res, next) => {
    const notifications = await Notification.find().populate('user', 'name email avatar').populate('order').populate('order user', 'name email avatar');;
    res.status(200).json({
        success: true,
        count: notifications.length,
        notifications  
    })
})


//Get single notification details        =>     /api/v1/notification/:id
exports.getSingleNotification = catchAsyncErrors(async (req, res, next) => {
    try {
        const notification = await Notification.findById(req.params.id).populate('user', 'name email avatar');;
        if(!notification){
            return next(new ErrorHandler("لم يتم العثور علي تنبيه", 404))
        }
        res.status(200).json({
            success: true,
            notification
        })
    }catch(error){
        console.log(error.message)
        // res.status(404).json({
        //     success: false,
        //     message: "Product not found!"
        // })
        return next(new ErrorHandler("لم يتم العثور علي تنبيه", 404))
    }
    
    
})

//Update Notification    =>     /api/v1/admin/notification/:id
exports.updateSingleNotification = catchAsyncErrors(async (req, res, next) => {
    try {
        let notification = await Notification.findById(req.params.id)
        if(!notification){
            return next(new ErrorHandler("لم يتم العثور علي تنبيه", 404))
        }
        notification.isRead = true
        await notification.save({ validateBeforeSave: false });
        const notifications = await Notification.find().populate('user', 'name email avatar');
        // notification = await Notification.findByIdAndUpdate(req.params.id, req.body, {
        //    new: true,
        //    runValidators: true,
        //    useFindAndModify: false
        // })
        res.status(200).json({
            success: true,
            notifications
        })
    }catch(error){
        console.log(error.message)
        return next(new ErrorHandler("لم يتم العثور علي تنبيه", 404))
    }
    

})

//Delete Notification    =>     /api/v1/admin/notification/:id
exports.deleteSingleNotification = catchAsyncErrors(async (req, res, next) => {
    try {
        const notification = await Notification.findById(req.params.id);
        if(!notification){
            return next(new ErrorHandler("لم يتم العثور علي تنبيه", 404))
        }

        await notification.remove();
        res.status(200).json({
            success: true,
            message: "Notification deleted successfully"
        })
    }catch(error){
        console.log(error.message)
        return next(new ErrorHandler("لم يتم العثور علي تنبيه", 404))
    }
    
})
