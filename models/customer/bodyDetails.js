const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

var bodyDetailsSchema = mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer"
    },
    height: {
      type: Number,
      max: 255,
      min: 1
    },
    weight: {
      type: Number,
      max: 255,
      min: 1
    },
    neck: {
      type: Number,
      max: 255,
      min: 1
    },
    thigh: {
      type: Number,
      max: 255,
      min: 1
    },
    chest: {
      type: Number,
      max: 255,
      min: 1
    },
    belly: {
      type: Number,
      max: 255,
      min: 1
    },
    color: {
      type: String,
      maxlength: 255,
      minlength: 1
    }
  },
  {
    timestamps: true
  }
);

const BodyDetails = mongoose.model("BodyDetails", bodyDetailsSchema);

function validationBodyDetails(bodyDetails) {
  const schema = {
    _id: Joi.objectId().required(),
    height: Joi.number()
      .max(255)
      .min(1)
      .required(),
    weight: Joi.number()
      .max(255)
      .min(1)
      .required(),
    neck: Joi.number()
      .max(255)
      .min(1),
    thigh: Joi.number()
      .max(255)
      .min(1),
    chest: Joi.number()
      .max(255)
      .min(1),
    belly: Joi.number()
      .max(255)
      .min(1),
    color: Joi.string()
      .max(255)
      .min(1)
  };
  return Joi.validate(bodyDetails, schema, { abortEarly: false });
}
module.exports = { BodyDetails, validationBodyDetails };
