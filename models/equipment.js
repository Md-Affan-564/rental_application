const mongoose = require("mongoose")

let equipmentSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    description: {
        type:String,
        required:true
    },
    ppd: {
        type:Number,
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    }
})

module.exports = mongoose.model("equipment",equipmentSchema)