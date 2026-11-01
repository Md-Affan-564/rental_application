const express = require("express")
const router = express.Router()
const userModel = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/create", async (req,res)=>{
    const {username,email,password} = req.body
    const user = await userModel.findOne({ email })
    console.log(user)
    if (user){
        return res.send("user already exists")
    }
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(password,salt,async (err,hash)=>{
            let newUser = await userModel.create({username,email,password:hash})
            let token = jwt.sign({email:newUser.email,user:newUser.username},process.env.JWT_SECRET)
            res.cookie("token",token)
            res.redirect("/dashboard")
        })
    })
})
module.exports = router