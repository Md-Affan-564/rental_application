const express = require("express")
const router = express.Router()
const protectRoute = require('../../middleware/protectRoute')
const rentalModel = require('../../models/rental')
const userModel = require('../../models/user')
const equipmentModel = require('../../models/equipment')

router.get("/profile",protectRoute,async (req,res)=>{
    const userData = await userModel.findOne({email:req.user.email})
    const rentalData = await rentalModel.find({renter:userData._id}).populate("equipment")
    const equipmentData = await equipmentModel.find({owner:userData._id})
    res.render("profile",{userData,rentalData,equipmentData})
})


module.exports = router