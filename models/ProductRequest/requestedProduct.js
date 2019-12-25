const mongoose = require("mongoose");
const Joi = require("joi");
const { imageSchema, attrSchema, pricingSchema } = require("./schemas");
Joi.objectId = require("joi-objectid")(Joi);

const requestedProductSchema = mongoose.Schema({
  brandName: {
    type: String,
    maxlength: 255,
    minlength: 1
  },
  productName: {
    type: String,
    maxlength: 255,
    minlength: 3,
    required: true
  },
  department: {
    type: String,
    maxlength: 255,
    minlength: 3,
    required: true
  },
  catagory: {
    type: String,
    maxlength: 255,
    minlength: 3,
    required: true
  },
  quantity: {
    type: Number,
    min: 1,
    required: "Product quantity is required"
  },
  active: {
    type: Boolean
  },
  images: [
    {
      type: imageSchema,
      required: "Product images required"
    }
  ],
  attrs: {
    type: attrSchema
  },
  pricing: {
    type: pricingSchema,
    required: true
  },
  saleLastDate: {
    type: Date
  },
  lastSaleDate: {
    type: Date
  }
});

const RequestedProduct = mongoose.model(
  "RequestedProduct",
  requestedProductSchema
);

function validateRequestedProduct(requestedProduct) {
  const schema = {
    brandName: Joi.string()
      .min(3)
      .max(255),
    productName: Joi.string()
      .min(3)
      .max(255)
      .required(),
    department: Joi.string()
      .min(3)
      .max(255)
      .required(),
    catagory: Joi.string()
      .min(3)
      .max(255)
      .required(),
    quantity: Joi.number()
      .min(1)
      .max(100),
    active: Joi.boolean(),
    images: Joi.array().items(
      Joi.object().keys({
        src: Joi.string()
          .min(3)
          .max(900),
        title: Joi.string()
          .min(3)
          .max(255),
        height: Joi.number(),
        width: Joi.number()
      })
    ),
    attrs: Joi.object().keys({
      size: Joi.string()
        .min(3)
        .max(255),
      color_family: Joi.string()
        .min(3)
        .max(255),
      color: Joi.string()
        .min(3)
        .max(255)
    }),
    pricing: Joi.object().keys({
      price: Joi.number().required(),
      discountAmount: Joi.number(),
      discountAmountLastDate: Joi.date(),
      discountPercentage: Joi.number(),
      discountPercentageLastDate: Joi.date(),
      sale_price: Joi.number()
    }),
    saleLastDate: Joi.date(),
    lastSaleDate: Joi.date()
  };
  return Joi.validate(requestedProduct, schema, {
    abortEarly: false
  });
}

module.exports = {
  validateRequestedProduct,
  RequestedProduct
};
