const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const { trackingSchema } = require("./schemas");

const DeliveryInfo = mongoose.model(
  "DeliveryInfo",
  new mongoose.Schema({
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DeliveryAddress",
      required: "Delevery address is required"
    },
    deliveryNotes: {
      type: String,
      maxlength: 1000,
      minlength: 5
    },
    tracking: {
      type: trackingSchema
    },
    status: {
      type: String,
      enum: ["Delevered", "Pending", "Canceled"],
      required: "Delevery status is required"
    },
    startedAt: Date,
    deliveredAt: Date,
    canceledAt: Date
  })
);

const validateDeliveryInfo = value => {
  const schema = {
    _id: Joi.objectId().required(),
    address: Joi.objectId().required(),
    deliveryNotes: Joi.string()
      .max(1000)
      .min(5),
    tracking: Joi.object().keys({
      company: Joi.string()
        .min(2)
        .max(100)
        .required(),
      trackingNumber: Joi.string()
        .min(2)
        .max(995)
        .required(),
      status: Joi.string()
        .min(1)
        .max(50)
    }),
    status: Joi.string().valid("Delevered", "Pending", "Canceled"),
    startedAt: Joi.date(),
    deleveredAt: Joi.date(),
    canceledAt: Joi.date()
  };
  return Joi.validate(value, schema);
};

module.exports = { validateDeliveryInfo, DeliveryInfo };
