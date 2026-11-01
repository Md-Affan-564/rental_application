const express = require("express")
const router = express.Router()
const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const equipmentModel = require("../models/equipment");
const protectRoute = require('../middleware/protectRoute')
const rentalModel = require('../models/rental')
const NOD = require('../utilities/numOfDays')
const getPriceByDate = require('../utilities/GPBD')





router.get("/rent/:id",protectRoute,async (req,res)=>{
    let itemId = req.params.id
    res.render("rental.ejs",{itemId})
})


router.post("/rent/:id", protectRoute, async (req, res) => {
    try {
        let { startDate, endDate } = req.body;
        let itemId = req.params.id;

        let days = NOD(startDate, endDate);

        if (!Number.isFinite(days) || days <= 0) {
            return res.send(`
                <script>
                    alert("Please enter valid rental dates!");
                    window.location.href = "/";
                </script>
            `);
        }

        let renter = await userModel.findOne({
            email: req.user.email
        });

        let item = await equipmentModel.findById(itemId);

        if (!renter || !item) {
            return res.send(`
                <script>
                    alert("User or equipment not found!");
                    window.location.href = "/dashboard";
                </script>
            `);
        }

        let overlapCheck = await rentalModel.findOne({
            equipment: itemId,
            startDate: { $lte: new Date(endDate) },
            endDate: { $gte: new Date(startDate) }
        });

        if (overlapCheck) {
            return res.send(`
                <script>
                    alert("Equipment is already booked for these dates!");
                    window.location.href = "/dashboard";
                </script>
            `);
        }

        let rent = getPriceByDate(days, item.ppd);

        await rentalModel.create({
            equipment: itemId,
            renter: renter._id,
            startDate,
            endDate,
            totalPrice: rent
        });

        return res.send(`
            <script>
                alert("Rental booked successfully!");
                window.location.href = "/dashboard";
            </script>
        `);

    } catch (err) {
        console.error(err);

        return res.send(`
            <script>
                alert("Something went wrong. Please try again!");
                window.location.href = "/dashboard";
            </script>
        `);
    }
});


module.exports = router 