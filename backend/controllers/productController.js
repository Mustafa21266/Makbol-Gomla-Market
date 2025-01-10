const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures.js');
const cloudinary = require('cloudinary')

//create new product    => /api/v1/admin/product/new
exports.newProduct = catchAsyncErrors(async (req, res, next) => {
    let images = []
    if(typeof req.body.images === 'string'){
        images.push(req.body.images)
    }else {
        images = req.body.images
    }
    let imagesLinks = [];
    for(let i = 0; i < images.length;i++){
        const result = await cloudinary.v2.uploader.upload(images[i],{
            folder: 'products'
        })

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url
        })
    }
    req.body.images = imagesLinks;
    req.body.user = req.user.id;
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
})

//Get all products   =>     /api/v1/products
exports.getProducts = catchAsyncErrors(async (req, res, next) => {
    const resultsPerPage = 9;
    const productsCount = await Product.countDocuments();
    console.log(req.query.keyword)
    if(req.query.keyword ==="home"){
        let products = await Product.find()
        // for(let i =0;i < products.length;i++){
        //     if(products[i].category === 'Chips And Snacks'){
        //         console.log(products[i].category)
        //       }else {
        //         console.log(products[i].category)
        //       }
    
        // }
        // console.log(products)
        res.status(200).json({
            success: true,
            count: products.length,
            productsCount,
            products
            
        })
        return ''

    }
    const apiFeatures = new APIFeatures(Product.find(), req.query).search().filter()
    // const products = await Product.find();
    // .pagination(resultsPerPage);
    let products = await apiFeatures.query;
    let filteredProductsCount = products.length;

    apiFeatures.pagination(resultsPerPage);


    products = await apiFeatures.query;
    for(let i =0;i < products.length;i++){
        if(products[i].category === 'Chips And Snacks'){
            console.log(products[i].category)
          }else {
            console.log(products[i].category)
          }

    }
    // console.log(products)
    res.status(200).json({
        success: true,
        count: products.length,
        productsCount,
        resultsPerPage,
        filteredProductsCount,
        products
        
    })
    
})

//Get single product details        =>     /api/v1/product/:id
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if(!product){
            return next(new ErrorHandler("المنتج غير متوفر !", 404))
        }
        res.status(200).json({
            success: true,
            product
        })
    }catch(error){
        console.log(error.message)
        // res.status(404).json({
        //     success: false,
        //     message: "المنتج غير متوفر !"
        // })
        return next(new ErrorHandler("المنتج غير متوفر !", 404))
    }
    
    
})

//Update product    =>     /api/v1/admin/product/:id
exports.updateSingleProduct = catchAsyncErrors(async (req, res, next) => {
    try {
        let product = await Product.findById(req.params.id)
        if(!product){
            return next(new ErrorHandler("المنتج غير متوفر !", 404))
        }

        let images = []
    if(typeof req.body.images === 'string'){
        images.push(req.body.images)
    }else {
        images = req.body.images
    }
    if(images !== undefined){
//Delete product images using id's
for(let i = 0;i < product.images.length; i++){
    const result = await cloudinary.v2.uploader.destroy(product.images[i].public_id)
}
let imagesLinks = [];
    for(let i = 0; i < images.length;i++){
        const result = await cloudinary.v2.uploader.upload(images[i],{
            folder: 'products'
        })

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url
        })
    }
    req.body.images = imagesLinks;
    }
    


        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
           new: true,
           runValidators: true,
           useFindAndModify: false
        })
        res.status(200).json({
            success: true,
            product
        })
    }catch(error){
        console.log(error.message)
        return next(new ErrorHandler("المنتج غير متوفر !", 404))
    }
    

})

//Delete Product    =>     /api/v1/admin/product/:id
exports.deleteSingleProduct = catchAsyncErrors(async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if(!product){
            return next(new ErrorHandler("المنتج غير متوفر !", 404))
        }

        //Delete product images using id's
        for(let i = 0;i < product.images.length; i++){
            const result = await cloudinary.v2.uploader.destroy(product.images[i].public_id)
        }
        
        await product.remove();
        res.status(200).json({
            success: true,
            message: "تم مسح المنتج بنجاح !"
        })
    }catch(error){
        console.log(error.message)
        return next(new ErrorHandler("المنتج غير متوفر !", 404))
    }
    
})

//Create new review      =>    /api/v1/review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, productId } = req.body;
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
        createdAt: Date.now()

    }
    const product = await Product.findById(productId);
    const isReviewed = product.reviews.find(
        r => r.user.toString() === req.user._id.toString()
    )
    if(isReviewed){
        product.reviews.forEach(review => {
            if(review.user.toString() === req.user._id.toString()){
                review.comment = comment;
                review.rating = rating;
            }
        })
    }else{
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }
    product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
    await product.save({ validateBeforeSave: false });
    const notification = await Notification.create({
        user: req.user._id,
        review: review._id,
        isRead: false
    })
    res.status(200).json({
        success: true
    })
})

//Get Product Reviews       =>     /api/v1/reviews
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);
    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})
//Delete Product Review       =>     /api/v1/reviews
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);
    const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString())
    
    const numOfReviews = reviews.length;
    
    const ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;
    await Product.findByIdAndUpdate(req.query.productId,{
        reviews,
        numOfReviews,
        ratings
    },{
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({
        success: true
    })
})




//Get all products for ADMIN  =>     /api/v1/admin/products
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
    
    const products = await Product.find();
    res.status(200).json({
        success: true,
        count: products.length,
        products
        
    })
})
