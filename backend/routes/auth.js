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
} = require('../controllers/authController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/authProtection');
//User CRUD
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").get(logoutUser)
router.route("/me").get(isAuthenticatedUser, getUserProfile)
router.route("/password/update").put(isAuthenticatedUser, updatePassword)
router.route("/me/update").put(isAuthenticatedUser, updateProfile)



router.route("/admin/users").get(allUsers)
router.route("/admin/user/:id").get(isAuthenticatedUser, authorizeRoles("admin"), getUserDetails)
router.route("/admin/user/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateUser)
router.route("/admin/user/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser)


router.route("/password/forgot").post(forgotPassword)
router.route("/password/reset/:token").put(resetPassword)
// router.route("/product/:id").get(getSingleProduct)
// router.route("/admin/product/:id").put(updateSingleProduct)
// router.route("/admin/product/:id").delete(deleteSingleProduct)

module.exports = router;