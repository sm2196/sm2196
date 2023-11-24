const express=require ('express');
const router=express.Router();
const authController=require('../controllers/auth');

router.post('/signup',authController.signup);   //route for signup
router.post('/login',authController.login);   //route for login
router.post('/logout',authController.logout);  //route for logout

module.exports=router;