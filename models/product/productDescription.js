const Joi = require("joi");
const mongoose = require("mongoose");
Joi.ObjectId = require("joi-objectid")(Joi);

const productDescriptionSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  },
  description: {
    type: String,
    minlength: 10,
    maxlength: 2000,
    required: true
  },
  videoUrl: {
    type: String,
    minlength: 3,
    maxlength: 1000
  }
});

const ProductDescription = mongoose.model(
  "ProductDescription",
  productDescriptionSchema
);

function validateProductDescription(productDescription) {
  const schema = {
    _id: Joi.ObjectId().required(),
    description: Joi.string()
      .min(10)
      .max(2000)
      .required(),
    videoUrl: Joi.string()
      .min(3)
      .max(1000)
  };
  return Joi.validate(productDescription, schema, { abortEarly: false });
}

module.exports = { ProductDescription, validateProductDescription };
