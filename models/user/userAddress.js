const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");

const userAddressSchema = new mongoose.Schema({
  country: {
    type: String,
    minlength: 4,
    maxlength: 50,
    required: true
  },
  city: {
    type: String,
    minlength: 4,
    maxlength: 50,
    required: true
  },
  state: {
    type: String,
    minlength: 4,
    maxlength: 50,
    required: true
  },
  road: {
    type: String,
    minlength: 4,
    maxlength: 50,
    required: true
  },
  house: {
    type: String,
    minlength: 4,
    maxlength: 50,
    required: true
  },
  floor: {
    type: Number
  }
});

const UserAddress = mongoose.model("UserAddress", userAddressSchema);

function validateUserAddress(address) {
  const schema = {
    country: Joi.string()
      .min(4)
      .max(50)
      .required(),
    city: Joi.string()
      .min(4)
      .max(50)
      .required(),
    state: Joi.string()
      .min(4)
      .max(50)
      .required(),
    road: Joi.string()
      .min(4)
      .max(50)
      .required(),
    house: Joi.string()
      .min(4)
      .max(50)
      .required(),
    floor: Joi.string()
  };

  return Joi.validate(address, schema);
}

module.exports = { UserAddress, validateUserAddress };
