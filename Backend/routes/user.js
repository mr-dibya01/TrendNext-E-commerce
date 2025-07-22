const router=require("express").Router();
const authMiddleware=require("../middlewares/auth.js");
const wrapAsync=require("../utils/wrapAsync.js");
const { validateAddress ,validateLogin ,validateRegister }=require("../middlewares/middlewares.js");
const userController =require("../controller/user.js");



// create new user
router.post("/register",validateRegister,wrapAsync(userController.createNewUser)); 

// Login route
router.post("/login",validateLogin,wrapAsync(userController.userLogin));

// push address of user
router.post("/address",validateAddress,authMiddleware,wrapAsync(userController.postUserAddress));

// get user dettails
router.get("/userInfo",authMiddleware,wrapAsync(userController.getUserInfo));

// get address of user
router.get("/address",authMiddleware,wrapAsync(userController.getUserAddress));

// update address of user
router.put("/address",validateAddress,authMiddleware,wrapAsync(userController.updateUserInfo));

module.exports=router; 