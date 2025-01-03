const express = require("express");
const router = express.Router();
const { newAccounting,
     getSingleAccounting, 
     myAccountings, 
     allAccountings, 
     updateAccounting, 
     deleteAccounting 
} = require('../controllers/accountingController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/authProtection');


//Order CRUD
router.route("/accounting/new").post(isAuthenticatedUser ,newAccounting)
router.route("/accounting/:id").get(isAuthenticatedUser ,getSingleAccounting)
router.route("/accountings/me").get(isAuthenticatedUser ,myAccountings)

//ADMIN
router.route("/admin/accountings").get(isAuthenticatedUser, authorizeRoles("admin") ,allAccountings)
router.route("/admin/accounting/:id").put(isAuthenticatedUser, authorizeRoles("admin") ,updateAccounting)
router.route("/admin/accounting/:id").delete(isAuthenticatedUser, authorizeRoles("admin") ,deleteAccounting)
// router.route("/product/:id").get(getSingleProduct)
// router.route("/admin/product/:id").put(isAuthenticatedUser, authorizeRoles("admin"),updateSingleProduct)
// router.route("/admin/product/:id").delete(isAuthenticatedUser, authorizeRoles("admin"),deleteSingleProduct)

module.exports = router;