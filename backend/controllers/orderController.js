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
    let user = await User.findOne({name: shippingInfo.user}).select("+password")

    if(!user){
        user = await User.create({
            name: shippingInfo.user,
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
        orderStatus: order.orderStatus,
        isRead: false
    })
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
    if(!orders){
        return next(new ErrorHandler(`لم يتم العثور علي اوردرات بالكود ${req.params.id}`,404))
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
    const user = await User.findById(req.user._id)
    if((user.role !== "seller" || user._id !== order.seller_id) || user.role === "admin"){
        return next(new ErrorHandler("حدث خطأ ما", 500))
    }
    if(order.orderStatus === 'Delivered'){
        return next(new ErrorHandler(`هذا الأوردر تم توصيله !`,400))
    }
    order.orderItems.forEach(async item => {
        await updateStock(item.product, item.quantity)
    })
    order.orderStatus = req.body.status;
    if(Number(req.body.discount) > 0.0){
        let newPrice = Number(order.totalPrice) - Number(req.body.discount);
        order.totalPrice = newPrice.toString()
    }
    order.discount = req.body.discount;
    order.deliveredAt = Date.now();
    // order.user = req.body._id;
    await order.save();
    const notification = await Notification.create({
        user: order.user._id,
        order: order._id,
        orderStatus: req.body.status,
        isRead: false
    })
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
    const order = await Order.findById(req.params.id).populate('user', 'name email avatar');
    if(!order){
        return next(new ErrorHandler(`لم يتم العثور علي أوردر بذلك الكود :  ${req.params.id}`,404))
    }
    const user = await User.findById(req.user._id)
        if((user.role !== "seller" || user._id !== order.seller_id) || user.role === "admin"){
            return next(new ErrorHandler("حدث خطأ ما", 500))
        }
    const notification = await Notification.create({
        user: order.user._id,
        orderStatus: "Deleted",
        isRead: false
    })
    await Notification.deleteMany({ order: req.params.id }, function (err) {});
    await order.remove();
    res.status(200).json({
        success: true
    })
})
