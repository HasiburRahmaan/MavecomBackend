const config = require("config");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  password: {
    type: String,
    maxlength: 1024,
    minlength: 6,
    required: true
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    unique: true,
    required: "Email address is required",
    validate: {
      validator: validator.isEmail,
      message: "Please enter a valid email address"
    },
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address"
    ]
  },

  active: Boolean,
  isSuperUser: Boolean,
  isAdmin: Boolean,
  isStaff: Boolean,
  birthDate: Date, //may be changed, will contain only date.
  createdAt: Date,
  updatedAt: Date
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      isAdmin: this.isAdmin,
      isStaff: this.isStaff,
      isSuperUser: this.isSuperUser
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

const User = mongoose.model("User", userSchema);

// var validateEmail = function(email) {
//   var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//   return re.test(email);
// };

function validateUser(user) {
  const schema = {
    password: Joi.string()
      .max(1024)
      .min(6)
      .required(),
    email: Joi.string()
      .email()
      .required(),
    active: Joi.boolean(),
    isSuperUser: Joi.boolean(),
    isAdmin: Joi.boolean(),
    isStaff: Joi.boolean(),
    birthDate: Joi.date(), //may be changed, will contain only date.
    createdAt: Joi.date(),
    updatedAt: Joi.date()
  };

  return Joi.validate(user, schema);
}

module.exports = { User, validateUser };
