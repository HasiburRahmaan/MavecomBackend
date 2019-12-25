const mongoose = require("mongoose");
const winston = require("winston");

const url = `mongodb+srv://nafiul:Abc13579@cluster0-ir0o6.mongodb.net/test?retryWrites=true&w=majority`;
const localUrl = `mongodb://localhost:27017/mavecom`

module.exports = function () {
  mongoose
    .connect(localUrl, {
      //.connect("mongodb://3.224.174.209:27017/mavecom", {
      useNewUrlParser: true
    })
    .then(() => console.log("Connected to MongoDB..."))
    .catch(err => console.log("can not connect,", err));
};
