const Order = require('../models/order');
const Product = require('../models/product');
const User = require('../models/user');
const Accounting = require('../models/accounting');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures.js');
const order = require('../models/order');


//Create new accounting      =>      /api/v1/order/new
exports.newAccounting = catchAsyncErrors(async (req, res, next) => {
    const {
        receivables,
        returns,
        user
    } = req.body;


    let userObj = await User.findOne({name: user}).select("+password")

    if(!userObj){
        return next(new ErrorHandler(`لم يتم العثور علي حساب بالكود : ${req.params.id}`,404))
    }
    //Finding user in database
    // let user = await User.findOne({name: shippingInfo.orderUser}).select("+password")

    const accounting = await Accounting.create({
        receivables,
        returns,
        user: userObj._id,
        createdAt: Date.now(),
    })
    console.log(accounting)
    res.status(200).json({
        success: true,
        accounting
    })

})

//Get single accounting      =>      /api/v1/order/:id
exports.getSingleAccounting = catchAsyncErrors(async (req, res, next) => {
    console.log(req.params.id)
    const accounting = await Accounting.findById(req.params.id).populate('user', 'name email');
    if(!accounting){
        return next(new ErrorHandler(`لم يتم العثور علي حساب بالكود : ${req.params.id}`,404))
    }
    res.status(200).json({
        success: true,
        accounting
    })
})


//Get logged in user orders      =>      /api/v1/orders/me
exports.myAccountings = catchAsyncErrors(async (req, res, next) => {
    const accountings = await Accounting.find({ user: req.user.id });
    if(!accountings){
        return next(new ErrorHandler(`لم يتم العثور علي حسابات بالكود ${req.params.id}`,404))
    }
    res.status(200).json({
        success: true,
        accountings
    })
})


//Get all accountings FOR ADMIN      =>      /api/v1/admin/orders
exports.allAccountings = catchAsyncErrors(async (req, res, next) => {
    const accountings = await Accounting.find().populate('user', 'name email');;
    

    if(!accountings){
        return next(new ErrorHandler(`لم يتم العثور علي أي حسابات`,404))
    }
    let totalReceivables = 0;
    let totalReturns = 0;
    accountings.forEach(accounting => {
        totalReceivables += accounting.receivables;
        totalReturns += accounting.returns;
    })
    res.status(200).json({
        success: true,
        totalReceivables,
        totalReturns,
        accountings
    })
})

//Update/ Process order - FOR ADMIN      =>      /api/v1/admin/order/:id
exports.updateAccounting = catchAsyncErrors(async (req, res, next) => {
    const accounting = await Accounting.findById(req.params.id);
    
    accounting.receivables = req.body.receivables;
    accounting.returns = req.body.returns;
    // order.user = req.body._id;
    await accounting.save();
    res.status(200).json({
        success: true
    })
})

//Delete order      =>      /api/v1/admin/order/:id
exports.deleteAccounting = catchAsyncErrors(async (req, res, next) => {
    const accounting = await Accounting.findById(req.params.id);
    if(!accounting){
        return next(new ErrorHandler(`Cannot delete an accounting with the ID: ${req.params.id}`,404))
    }
    await accounting.remove();
    res.status(200).json({
        success: true
    })
})