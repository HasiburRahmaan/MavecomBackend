const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const orderedProductSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  },
  productVariantId: {
    type: mongoose.Schema.Types.ObjectId,
    maxlength: 1000,
    minlength: 5,
    required: "ProductVarient is required"
  },
  quantity: {
    type: Number,
    required: "quantity is required"
  }
});

const orderSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: "customer id is required"
  },
  customerName: {
    type: String,
    maxlength: 200,
    minlength: 3
  },
  phone: {
    type: String,
    maxlength: 20,
    minlength: 11
  },
  orderedProducts: [
    {
      type: orderedProductSchema,
      required: true
    }
  ],
  actualCost: {
    type: Number
  },
  totalDiscount: {
    type: Number
  },
  totalCost: {
    type: Number
    // required:"total cost required"
  },
  deliveryInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DeliveryInfo"
  },
  rating: {
    type: Number
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
  isCanceled: {
    type: Boolean,
    default: false
  },
  canceledAt: {
    type: Date
  }
}, {
  timestamps: true
});

const Order = mongoose.model("Order", orderSchema);

function validateOrder(order) {
  const schema = {
    customerId: Joi.objectId().required(),
    customerName: Joi.string()
      .min(3)
      .max(200),
    phone: Joi.string()
      .max(20)
      .min(11),
    orderedProducts: Joi.array()
      .items({
        productId: Joi.objectId().required(),
        productVariantId: Joi.objectId().required(),
        quantity: Joi.number().required()
      })
      .required(),
    actualCost: Joi.number(),
    totalDiscount: Joi.number(),
    totalCost: Joi.number(),
    rating: Joi.number(),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
    isCanceled: Joi.boolean(),
    canceledAt: Joi.date()
  };
  return Joi.validate(order, schema, {
    abortEarly: false
  });
}

module.exports = {
  validateOrder,
  Order
};
