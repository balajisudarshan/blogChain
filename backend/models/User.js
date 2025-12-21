const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        require:true,
        unique:true,
        trim:true,
        lowercase:true,
        validate(){
            if(!this.email.includes("@")){
                throw new Error("Invalid email")
            }
        }
    },
    password:{
        type:String,
        required:true,
        validate(){
            if(this.password.length < 8){
                throw new Error("Password must be at least 8 characters long")
            }
        }
    },
    avatar:{
        type:String
    },
    bio:{
        type:String
    },
    skills:{
        type:[String],
    },
    gender:{
        type:String
    },
    age:{
        type:Number
    }
},{timestamps:true})

const User = mongoose.model("User",userSchema)

module.exports = User