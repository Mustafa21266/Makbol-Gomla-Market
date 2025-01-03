const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter product name"],
        trim: true,
        maxLength: [100, "Maximum character length exceeded"]
    },
    price: {
        type: Number,
        required: [true, "Please enter product price"],
        maxLength: [5, "Maximum price length exceeded"],
        default: 0.0
    },
    description: {
        type: String,
        required: [true, "Please enter product description"],
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                // required: true
            },
            url: {
                type: String,
                // required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, "Please enter product category"]
    },
    subcategory: {
        type: String,
        required: [true, "Please enter product sub category"],
        default: 'قطاعى'
    },
    seller: {
        type: String,
        required: false,
        default: "Me"
    },
    stock: {
        type: Number,
        required: [true, "Please enter product stock"],
        maxLength: [100, "Maximum product stock length exceeded"],
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true
            },
           name: {
               type: String,
               required: true
           },
           rating: {
            type: Number,
            required: true
        },
        comment: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            required: true,
            default: Date.now
        }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
    ,
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})


//

module.exports =   mongoose.model('Product', productSchema);


// ,
//         enum: {
//             values: [
//                 'Electronics',
//                 'Cameras',
//                 'Laptop',
//                 'Accessories',
//                 'Food',
//                 'Books',
//                 'Clothes/Shoes',
//                 'Sports',
//                 'Home',
//             ],
//             message: "Please select correct category"
//         }