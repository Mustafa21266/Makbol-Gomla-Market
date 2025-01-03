const Order = require('../models/order');
const Product = require('../models/product');
const Notification = require('../models/notification.js');
const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures.js');
const order = require('../models/order');

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

//Create new order      =>      /api/v1/order/new
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
    } = req.body;
    //Finding user in database
    let user = await User.findOne({name: shippingInfo.orderUser}).select("+password")

    if(!user){
        user = await User.create({
            name: shippingInfo.orderUser,
            email: makeEmail(),
            password:"Aa@1234",
        });
    }
    
    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: user._id
    })
    const notification = await Notification.create({
        user: user._id,
        order: order._id,
        isRead: false
    })
    // const accountSid = 'ACb0cb252605c43dae654eda810b742b81';
    // const authToken = '73f7c3eb01e2caf308350c532c2f9540';
    // const client = require('twilio')(accountSid, authToken);
    // client.messages
    //     .create({
    //         body: 'Ahoy 👋',
    //         messagingServiceSid: 'MG2cd25e5fabae6ba622036c4277143a23',
    //         to: '+201553786175'
    //     })
    //     .then(message => console.log(message.sid));
    res.status(200).json({
        success: true,
        order
    })

})

//Get single order      =>      /api/v1/order/:id
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
    console.log(req.params.id)
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if(!order){
        return next(new ErrorHandler(`لم نعثر علي منتج بذلك الكود ${req.params.id}`,404))
    }
    res.status(200).json({
        success: true,
        order
    })
})


//Get logged in user orders      =>      /api/v1/orders/me
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({ user: req.user.id });
    if(!order){
        return next(new ErrorHandler(`لم نعثر علي منتج بذلك الكود ${req.params.id}`,404))
    }
    res.status(200).json({
        success: true,
        orders
    })
})


//Get all orders FOR ADMIN      =>      /api/v1/admin/orders
exports.allOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find();
    

    if(!order){
        return next(new ErrorHandler(`لم يتم العثور علي أي أوردرات`,404))
    }
    let totalAmount = 0;
    orders.forEach(order => {
        totalAmount += order.totalPrice;
    })
    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
})

//Update/ Process order - FOR ADMIN      =>      /api/v1/admin/order/:id
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    

    if(order.orderStatus === 'Delivered'){
        return next(new ErrorHandler(`هذا الأوردر تم توصيله !`,400))
    }
    order.orderItems.forEach(async item => {
        await updateStock(item.product, item.quantity)
    })

    order.orderStatus = req.body.status;
    order.deliveredAt = Date.now();
    // order.user = req.body._id;
    await order.save();
    res.status(200).json({
        success: true
    })
})
async function updateStock(id, quantity){
    const product = await Product.findById(id);
    product.stock = product.stock - quantity;
    await product.save({ validateBeforeSave: false });
}


//Delete order      =>      /api/v1/admin/order/:id
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if(!order){
        return next(new ErrorHandler(`لم يتم العثور علي أوردر بذلك الكود :  ${req.params.id}`,404))
    }
    await order.remove();
    res.status(200).json({
        success: true
    })
})