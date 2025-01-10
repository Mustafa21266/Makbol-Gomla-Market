const express = require("express");
const router = express.Router();
const { getNotifications,
        getSingleNotification,
        updateSingleNotification,
        deleteSingleNotification,
     } = require('../controllers/notificationController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/authProtection');

router.route("/notifications").get(getNotifications)

//Product CRUD
// router.route("/admin/product/new").post(isAuthenticatedUser, authorizeRoles("admin"),newProduct)
router.route("/notification/:id").get(getSingleNotification)
router.route("/admin/notification/:id").put(isAuthenticatedUser, updateSingleNotification)
router.route("/admin/notification/:id").delete(isAuthenticatedUser, authorizeRoles("admin"),deleteSingleNotification)

module.exports = router;
