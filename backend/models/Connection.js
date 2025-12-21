const mongoose = require('mongoose')

const connectionSchema = new mongoose.Schema({
    fromId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    toId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    status:{
        type:String,
        enum:['like','accepted','rejected','ignore']
    },
},{timestamps:true})

connectionSchema.pre("save",async function(next){
    const connection = this

    if(connection.fromId.equals(connection.toId)){
        throw new Error("You cannot send connection to your own")
    }
    next()
})

module.exports = mongoose.model("Connection",connectionSchema)