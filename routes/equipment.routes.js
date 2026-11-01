const express = require("express");
const router = express.Router();
const protectRoute = require('../middleware/protectRoute')
const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const equipmentModel = require("../models/equipment");

router.get("/equipment",protectRoute,(req,res)=>{
    res.render("equipment")
})
router.post("/equipment",protectRoute,async (req,res)=>{
    let t = req.cookies.token
    let tInfo = jwt.verify(t,process.env.JWT_SECRET)
    let owner = await userModel.findOne({email:tInfo.email})
    let {name,description,ppd} = req.body
    let equi = await equipmentModel.create({name,description,ppd,owner:owner._id})
    res.redirect("/dashboard")
})

module.exports = router;