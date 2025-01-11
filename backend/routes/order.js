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
router.route("/order/confirm/:id").get(isAuthenticatedUser ,getSingleOrder)
router.route("/order/:id").get(isAuthenticatedUser ,getSingleOrder)
router.route("/orders/me").get(isAuthenticatedUser ,myOrders)

//ADMIN
router.route("/admin/orders").get(isAuthenticatedUser, authorizeRoles("admin") ,allOrders)
router.route("/admin/order/:id").put(isAuthenticatedUser, authorizeRoles("admin") ,updateOrder)
router.route("/admin/order/:id").delete(isAuthenticatedUser, authorizeRoles("admin") ,deleteOrder)
// router.route("/product/:id").get(getSingleProduct)
// router.route("/admin/product/:id").put(isAuthenticatedUser, authorizeRoles("admin"),updateSingleProduct)
// router.route("/admin/product/:id").delete(isAuthenticatedUser, authorizeRoles("admin"),deleteSingleProduct)

module.exports = router;
