const express = require("express");
const router = express.Router();
const { registerUser, 
    loginUser, 
    logoutUser, 
    forgotPassword, 
    resetPassword, 
    getUserProfile, 
    updatePassword, 
    updateProfile,
    allUsers,
    getUserDetails,
    updateUser,
    deleteUser
} = require('../controllers/sellerController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/authProtection');
//User CRUD

router.route("/admin/users").get(allUsers)
router.route("/admin/user/:id").post(isAuthenticatedUser, authorizeRoles("admin"), getUserDetails)
router.route("/admin/user/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateUser)
router.route("/admin/user/delete/:id").put(isAuthenticatedUser, authorizeRoles("admin"), deleteUser)

router.route("/admin/users").get(allUsers)
router.route("/admin/user/:id").post(isAuthenticatedUser, authorizeRoles("admin"), getUserDetails)
router.route("/admin/user/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateUser)
router.route("/admin/user/delete/:id").put(isAuthenticatedUser, authorizeRoles("admin"), deleteUser)

module.exports = router;