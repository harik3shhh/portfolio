const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    slug:{
        type: String,
        required: true,

    },
    description:{
        type: String,
        required: true,
    },
  
    category: {
        type: mongoose.ObjectId,
        ref:  "Category",
        required: true
    },
   
    photo: {
        data: Buffer,
        contentType: String 
    },

    link :{
        type: String,
        required: true,
    },

  
}, {timestamps:true});

module.exports = new mongoose.model("Product", productSchema);