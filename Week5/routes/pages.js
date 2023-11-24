const express=require ('express');
const router=express.Router();

router.get("/",(req, res ) =>{
    res.render("index");
});


router.get("/profile",(req, res ) =>{
    res.render("profile");
});

router.get("/signup",(req, res ) =>{
    res.render("signup");
});

router.get("/login",(req, res ) =>{
    res.render("login");
});

router.get("/logout",(req, res ) =>{
    res.render("logout");
});

module.exports=router;