const mongoose = require("mongoose");
const Joi = require("joi");
const validator = require("validator");
Joi.objectId = require("joi-objectid")(Joi);

var customerSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
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
    //phone field will be changed with proper validation
    phone: {
      type: String,
      maxlength: 11,
      minlength: 11
    },
    fullName: {
      type: String,
      maxlength: 50,
      minlength: 3,
      required: true,
      trim: true
    },
    lFullName: {
      type: String,
      maxlength: 50,
      minlength: 3,
      lowercase: true,
      trim: true
    },
    total_buy: {
      type: Number,
      min: 0
    },
    religion: {
      type: String,
      maxlength: 100,
      minlength: 3
    },
    gender: {
      type: String,
      maxlength: 100,
      minlength: 3
    },
    images: [String],
    bodyDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BodyDetails"
    },
    sellerInfo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SellerInfo"
    },
    deliveryAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DeliveryAddress"
    },
    isSeller: {
      type: Boolean
    },
    createdAt: {
      type: Date
    },
    updatedAt: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

const Customer = mongoose.model("Customer", customerSchema);

function validateCustomer(customer) {
  const schema = {
    _id: Joi.objectId(),
    email: Joi.string()
      .email()
      .required(),
    phone: Joi.string()
      .max(11)
      .min(11),
    fullName: Joi.string()
      .max(50)
      .min(3)
      .required(),
    religion: Joi.string()
      .max(100)
      .min(3),
    gender: Joi.string()
      .max(100)
      .min(3),
    images: Joi.array().items(Joi.string()),
    sellerInfo: Joi.objectId(),
    deliveryAddress: Joi.objectId(),
    isSeller: Joi.boolean(),
    createdAt: Joi.Date(),
    updatedAt: Joi.Date()
  };
  return Joi.validate(customer, schema, { abortEarly: false });
}

function validateCustomerforUpdate(customer) {
  const schema = {
    _id: Joi.objectId().required(),
    email: Joi.string()
      .email(),
    phone: Joi.string()
      .max(11)
      .min(11),
    fullName: Joi.string()
      .max(50)
      .min(3)
      .required(),
    religion: Joi.string()
      .max(100)
      .min(3),
    gender: Joi.string()
      .max(100)
      .min(3),
    images: Joi.array().items(
      Joi.string()
        .max(1000)
        .min(3)
    ),
    sellerInfo: Joi.objectId(),
    deliveryAddress: Joi.objectId(),
    isSeller: Joi.boolean()
  };
  return Joi.validate(customer, schema, { abortEarly: false });
}

function validateCustomerforRegister(customer) {
  const schema = {
    _id: Joi.objectId(),
    password: Joi.string()
      .min(6)
      .max(30)
      .required(),
    email: Joi.string()
      .email()
      .required(),
    phone: Joi.string()
      .max(11)
      .min(11),
    fullName: Joi.string()
      .max(50)
      .min(3)
      .required(),
    religion: Joi.string()
      .max(100)
      .min(3),
    gender: Joi.string()
      .max(100)
      .min(3),
    images: Joi.array().items(Joi.string()),
    sellerInfo: Joi.objectId(),
    deliveryAddress: Joi.objectId(),
    isSeller: Joi.boolean(),
    createdAt: Joi.date(),
    updatedAt: Joi.date()
  };
  return Joi.validate(customer, schema, { abortEarly: false });
}
module.exports = {
  Customer,
  validateCustomer,
  validateCustomerforUpdate,
  validateCustomerforRegister
};
