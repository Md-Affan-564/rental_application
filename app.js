const express = require('express')
const jwt = require('jsonwebtoken')
const userModel = require('./models/user')
const bcrypt = require('bcrypt')
const equipmentModel = require('./models/equipment')
const authRoutes = require('./routes/auth.routes')
const equipmentRoutes = require('./routes/equipment.routes')
const app = express()
const protectRoute = require('./middleware/protectRoute')
const rentalRoutes = require('./routes/rental.routes')
const cookieparser = require('cookie-parser')
const createRoutes = require('./routes/userRoutes/create.route')
const profileRoutes = require('./routes/userRoutes/profile.route')


app.use(cookieparser())
app.set('view engine','ejs')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/",equipmentRoutes)
app.use("/",authRoutes)
app.use("/",rentalRoutes)
app.use("/",createRoutes)
app.use("/",profileRoutes)

app.listen(3000,()=>{
    console.log("Server Started")
})



