const mongoose = require("mongoose");
const winston = require("winston");

module.exports = function() {
  mongoose
    // .connect("mongodb://173.82.212.25:27017/mavecom", { useNewUrlParser: true })
    .connect("mongodb://localhost:27017/mavecom", {useNewUrlParser:true}) 
    .then(() => winston.info("Connected to MongoDB..."))
    // .then(() => console.log("Connected to MongoDB..."))
    .catch(err=>("can not connect,",err));
}; 
 