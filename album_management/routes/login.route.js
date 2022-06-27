const express=require("express")
const router= express.Router();
const userLogin=require("../login/auth.login");

router.post("/login",userLogin.login)


module.exports=router