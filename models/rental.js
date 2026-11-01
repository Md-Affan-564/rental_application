const mongoose = require("mongoose")

let rentalSchema = new mongoose.Schema({
    equipment:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'equipment',
    },
    renter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    startDate: Date,
    endDate: Date,
    totalPrice:Number,
    status:{
        type: String,
        default: "confirmed"
    }

})

module.exports = mongoose.model("rental",rentalSchema)