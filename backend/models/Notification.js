const mongoose = require("mongoose")

const notificationSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    type:String,
    message:String,
    fromId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    isRead:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

module.exports = new mongoose.model("Notification",notificationSchema)