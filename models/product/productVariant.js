const mongoose = require("mongoose");
const Joi = require("joi");
Joi.ObjectId = require("joi-objectid")(Joi);

const discountSchema = mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  from: {
    type: Date,
    required: true
  },
  to: {
    type: Date,
    required: true
  }
});

const packagePricingSchema = mongoose.Schema({
  piece: {
    type: Number,
    min: 2,
    required: true
  },
  price: {
    type: Number,
    min: 0,
    required: true
  }
});

const variantSchema = mongoose.Schema({
  createdAt: {
    type: Date,
    default: new Date()
  },
  updatedAt: {
    type: Date
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  images: [String],
  attrs: {
    // any attribute is allowed.
  },
  quantity: {
    type: Number,
    minlength: 0
  },
  price: {
    type: Number,
    required: true
  },
  purchasePrice: {
    type: Number
  },
  discountAmount: discountSchema,
  discountPercentage: discountSchema,
  packagePricing: [packagePricingSchema],
  availableTill: {
    type: Date
  },
  lastSaleDate: {
    type: Date
  }
});

const productVariantSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  count: {
    type: Number,
    min: 1
    // required:true
  },
  variants: [
    {
      type: variantSchema
    }
  ]
});

const ProductVariant = mongoose.model("ProductVariant", productVariantSchema);

//Validator Functions

const discountValidator = Joi.object().keys({
  amount: Joi.number(),
  from: Joi.date(),
  to: Joi.date()
});

const packagePricingSchemaValidator = Joi.object().keys({
  piece: Joi.number()
    .min(2)
    .required(),
  price: Joi.number()
    .min(0)
    .required()
});

const attrsSchemaValidator = Joi.object();

const variantSchemaValidator = Joi.object().keys({
  _id: Joi.ObjectId(),
  createdAt: Joi.date(),
  updatedAt: Joi.date(),
  rating: Joi.number()
    .min(1)
    .max(5),
  isAvailable: Joi.boolean(),
  images: Joi.array().items(Joi.string()),
  quantity: Joi.number().min(0),
  discountAmount: discountValidator,
  discountPercentage: discountValidator,
  price: Joi.number().required(),
  purchasePrice: Joi.number(),
  attrs: attrsSchemaValidator,
  packagePricing: Joi.array().items(packagePricingSchemaValidator),
  availableTill: Joi.date(),
  lastSaleDate: Joi.date(),
  __v: Joi.number()
});

function validateProductVariant(productVariant) {
  const schema = {
    _id: Joi.ObjectId().required(),
    count: Joi.number()
      .min(1)
      .required(),
    variants: Joi.array().items(variantSchemaValidator),
    __v: Joi.number()
  };
  return Joi.validate(productVariant, schema);
}

module.exports = { ProductVariant, validateProductVariant };
