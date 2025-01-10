const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    isRead: {
        type: Boolean,
        required: true,
        default: false
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: false
    },
    review: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: false
    }
})


//

module.exports =   mongoose.model('Notification', notificationSchema);


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
