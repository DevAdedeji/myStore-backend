const mongoose = require('mongoose');
const {isEmail} = require('validator');

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true, 'Username is required'],
        unique:[true, 'Username already exist'],
        lowercase:true,
    },
    email:{
        type:String,
        required:[true, 'Email is required'],
        unique:[true, 'Email already exists'],
        lowercase:true,
        validate:[isEmail, 'Please enter a valid email'],
    },
    password:{
        type:String,
        required:true,
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
}, {timestamps:true})

const User = mongoose.model("User", UserSchema)

module.exports = User;