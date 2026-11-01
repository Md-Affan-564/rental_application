const express = require("express")
const router = express.Router()
const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const equipmentModel = require('../models/equipment')
const jwt = require("jsonwebtoken");


router.get("/login",(req,res)=>{
    res.render("login")
})
router.get("/dashboard",async (req,res)=>{
    let equipments = await equipmentModel.find()
    res.render("dashboard",{equipments})
})
router.get("/",(req,res)=>{
    res.redirect("/dashboard")
})
router.get("/signup",(req,res)=>{
    res.render("signup")
})
router.post("/logout",(req,res)=>{
    res.clearCookie("token","")
    res.send("<script>alert('logged out!'); window.location.href='/dashboard';</script>");
})

router.post("/login",async (req,res)=>{
    let {email,password} = req.body
    let user = await userModel.findOne({email}) 
    if (user){
        const check = await bcrypt.compare(password,user.password)
        console.log(check)
        if(check){
            let newUser = await userModel.findOne({email})
            let token = jwt.sign({email:user.email,user:user.username},process.env.JWT_SECRET)
            res.cookie("token",token)
            res.redirect("/dashboard")
        }else{
            res.send("<script>alert('something went wrong!'); window.location.href='/login';</script>");
        }
    }else{
        res.send("<script>alert('email cannot be empty!'); window.location.href='/login';</script>");
    }
})

module.exports = router