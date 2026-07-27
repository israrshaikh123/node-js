const mongoose = require("mongoose");

const connectDB = () => {
   mongoose.connect("mongodb://localhost:27017/hospitalDB") 
   .then(() => {
    console.log("MongoDB Connected Successfully");
   })
   .catch((err) => {
    console.log("Error :" , err);  
   });
};

module.exports = connectDB;