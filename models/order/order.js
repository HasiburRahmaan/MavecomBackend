const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const {
  trackingSchema,
  delivaryInfoSchema,
  paymentSchema
} = require('./schemas');

const orderSchema = new mongoose.Schema({
  invoice: {
    type: String,
    maxlength: 10000,
    minlength: 1,
    required: 'invoice required'
  },
  shipping: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OrderShipping'
  },
  delivery_notes: {
    type: String,
    maxlength: 1000,
    minlength: 2
  },
  tracking: {
    type: trackingSchema,
    required: 'tracking required'
  },
  orderedProducts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'OrderedProduct'
    }
  ],
  actualCost: {
    type: Number,
    
  },
  totalDiscount: {
    type: Number
  },
  totalCost: {
    type: Number
    // required:"total cost required"
  },
  delivaryInfo: {
    type: delivaryInfoSchema,
    required: 'delivary info required '
  },
  rating: {
    type: Number
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
  isCanceled: {
    type: Boolean
  },
  canceledAt: {
    type: Date
  },
  payment: {
    type: paymentSchema,
    required: 'payment method is required'
  }
});

const Order = mongoose.model('Order', orderSchema);

function validateOrder(order) {
  const schema = {
    invoice: Joi.string()
      .max(10000)
      .min(1)
      .required(),
    shipping: Joi.objectId().required(),
    delivery_notes: Joi.string()
      .max(1000)
      .min(1),
    tracking: Joi.object().keys({
      company: Joi.string()
        .min(2)
        .max(100)
        .required(),
      tracking_number: Joi.string()
        .min(2)
        .max(995)
        .required(),
      status: Joi.string()
        .min(1)
        .max(50)
    }),
    orderedProducts: Joi.array()
      .items(Joi.objectId())
      .required(),
    actualCost: Joi.number(),
    totalDiscount: Joi.number(),
    totalCost: Joi.number(),
    delivaryInfo: Joi.object().keys({
      stated_at: Joi.date(),
      isDelivered: Joi.boolean(),
      isCanceled: Joi.boolean(),
      ended_at: Joi.date().required()
    }),
    rating: Joi.number(),
    created_at: Joi.date(),
    updated_at: Joi.date(),
    isCanceled: Joi.boolean(),
    canceledAt: Joi.date(),
    payment: Joi.object().keys({
      method: Joi.string()
        .min(2)
        .max(100)
        .required(),
      transiction_id: Joi.string()
        .min(2)
        .max(900)
        .required()
    })
  };
  return Joi.validate(order, schema, {
    abortEarly: false
  });
}

module.exports = {
  validateOrder,
  Order
};
