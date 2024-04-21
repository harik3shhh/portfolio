const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        requried: true
    },

    email:{
        type:String,
        requried: true
    },

    phone:{
        type:Number,
        requried: true
    },

    password:{
        type:String,
        requried: true
    },

    answer:{
        type: String,
        required: true,
    },
    
    role:{
        type: Number,
        default: 0,
    },
}, {timestamps: true});

const User = new mongoose.model("User", userSchema);

module.exports = User;