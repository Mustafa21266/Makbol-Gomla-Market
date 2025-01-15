const express = require("express");
const router = express.Router();
const { newOrder,
     getSingleOrder,
     getOrderConfirm,
     myOrders, 
     allOrders, 
     updateOrder, 
     deleteOrder 
} = require('../controllers/orderController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/authProtection');


//Order CRUD
router.route("/order/new").post(isAuthenticatedUser ,newOrder)
// router.route("/order/confirm/:id").get(isAuthenticatedUser ,getSingleOrder)
router.route("/order/:id").post(isAuthenticatedUser ,getSingleOrder)
router.route("/orders/me").post(isAuthenticatedUser ,myOrders)

//ADMIN
router.route("/seller/orders").post(isAuthenticatedUser, authorizeRoles("seller") ,allOrders)
router.route("/seller/order/:id").put(isAuthenticatedUser, authorizeRoles("seller") ,updateOrder)
router.route("/admin/seller/delete/:id").put(isAuthenticatedUser, authorizeRoles("seller") ,deleteOrder)
router.route("/admin/orders").post(isAuthenticatedUser, authorizeRoles("admin") ,allOrders)
router.route("/admin/order/:id").put(isAuthenticatedUser, authorizeRoles("admin") ,updateOrder)
router.route("/admin/order/delete/:id").put(isAuthenticatedUser, authorizeRoles("admin") ,deleteOrder)
// router.route("/product/:id").get(getSingleProduct)
// router.route("/admin/product/:id").put(isAuthenticatedUser, authorizeRoles("admin"),updateSingleProduct)
// router.route("/admin/product/:id").delete(isAuthenticatedUser, authorizeRoles("admin"),deleteSingleProduct)

module.exports = router;
