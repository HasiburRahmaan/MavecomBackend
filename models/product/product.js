const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const productSchema = mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    name: {
      type: String,
      minlength: 3,
      maxlength: 100,
      required: true
    },
    lName: {
      type: String,
      minlength: 4,
      maxlength: 100
    },
    department: {
      type: String,
      minlength: 3,
      maxlength: 50,
      required: true
    },
    category: {
      type: [String],
      required: true
    },
    brandName: {
      type: String,
      minlength: 2,
      maxlength: 30
    },
    model: {
      type: String,
      minlength: 1,
      maxlength: 100
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer"
    },
    totalStock: {
      type: Number,
      default: 0
    },
    priceRange: {
      type: [Number],
      validate: [rangeArrayLimit]
    },

    thumbnailImages: [
      {
        type: String,
        minlength: 5,
        required: true
      }
    ],
    discountAmount: {
      type: Number,
      default: 0
    },
    discountPercentage: {
      type: Number,
      default: 0
    },
    shortDetails: {
      type: String,
      minlength: 4,
      maxlength: 100
    },
    description: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductDescription"
    },
    shipping: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shipping"
    },
    brandInfo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand"
    },
    approved: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: true
    },
    createdAt: {
      type: Date,
      default: new Date()
    },
    updatedAt: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

//validation function for price range array
function rangeArrayLimit(val) {
  return val.length == 2;
}

const Product = mongoose.model("Product", productSchema);

function validateProduct(product) {
  const schema = {
    _id: Joi.ObjectId(),
    name: Joi.string()
      .min(3)
      .max(100)
      .required(),
    lName: Joi.string()
      .min(4)
      .max(100),
    department: Joi.string()
      .min(3)
      .max(50)
      .required(),
    category: Joi.array()
      .items(Joi.string())
      .required(),
    totalStock: Joi.number().integer(),
    priceRange: Joi.array()
      .items(Joi.number())
      .max(2),
    model: Joi.string()
      .min(1)
      .max(100),
    brandName: Joi.string()
      .min(2)
      .max(30)
      .required(),
    brandInfo: Joi.objectId(),
    thumbnailImages: Joi.array().items(Joi.string()),
    discountAmount: Joi.number().integer(),
    discountPercentage: Joi.number().integer(),
    shortDetails: Joi.string()
      .min(4)
      .max(100),
    description: Joi.objectId(),
    shipping: Joi.objectId().required(),
    createdAt: Joi.date(),
    updatedAt: Joi.date()
  };
  return Joi.validate(product, schema);
}
module.exports = { Product, validateProduct };
