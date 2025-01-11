const express = require("express");
const router = express.Router();
const { getProducts,
        newProduct,
        getSingleProduct,
        updateSingleProduct,
        deleteSingleProduct,
        createProductReview,
        getProductReviews,
        deleteReview,
        getAdminProducts
     } = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/authProtection');

router.route("/products").get(getProducts)
router.route("/admin/products").get(getAdminProducts)


//Product CRUD
router.route("/admin/product/new").post(isAuthenticatedUser, authorizeRoles("admin"),newProduct)
router.route("/product/:id").get(getSingleProduct)
router.route("/admin/product/:id").put(isAuthenticatedUser, authorizeRoles("admin"),updateSingleProduct)
router.route("/admin/product/:id").delete(isAuthenticatedUser, authorizeRoles("admin"),deleteSingleProduct)



router.route("/review").put(isAuthenticatedUser, createProductReview)
router.route("/reviews").get(getProductReviews)
router.route("/reviews").delete(deleteReview)

module.exports = router;