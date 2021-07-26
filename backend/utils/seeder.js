const Product = require('../models/product');
const dotenv = require('dotenv');
const connectDatabase = require('../config/database');
const fetch = require("node-fetch");
const products = require('../data/products.json');
const cloudinary = require('cloudinary');
//Setting dotenv file
dotenv.config({ path: 'backend/config/config.env' });
connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})
const toDataURL = (url) => {
    return fetch(url).then((response) => {
            return response.blob();
        }).then(blob => {

            return URL.createObjectURL(blob);
        });
}

const uploadToCloudinary = async (blob) => {
    const result = await cloudinary.v2.uploader.upload(blob, {
        folder: 'products',
        width: 300,
        crop: 'scale'
    })
    return result
}

const seedProducts = async () => {
    try {
        await Product.deleteMany();
        console.log("Products deleted successfully");

    let newProducts = await Promise.all(products.map(async (p) => {
        // let url = await toDataURL(p.image)
        let result = await uploadToCloudinary(p.image);
        p.images = [
            {
            public_id: result.public_id,
            url: result.secure_url
        }
        ]
        p.user = "60f0dd349e9390052c1bd887"
        return p;
    }));
    let productsSTRJSON = await JSON.stringify(newProducts)
    let productsJSON = await JSON.parse(productsSTRJSON)

    await Product.insertMany(productsJSON);
    console.log("Products Added successfully");
    process.exit();

    } catch(error){
        console.log(error.message);
        process.exit();
    }
}
seedProducts();