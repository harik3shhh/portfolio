const mongoose = require("mongoose");

const DB = process.env.DB; 

mongoose.connect(DB).then(()=>{
    console.log("Connected!!!");
}).catch((err)=>{
    console.log("Failed!!!");
});