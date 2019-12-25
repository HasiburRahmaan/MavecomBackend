const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const paymentSchema = new mongoose.Schema({
  method: {
    type: String,
    maxlength: 100,
    minlength: 2,
    required: "method is required"
  },
  transiction_id: {
    type: String,
    maxlength: 900,
    minlength: 5
  }
});

const trackingSchema = new mongoose.Schema({
  company: {
    type: String,
    maxlength: 100,
    minlength: 2,
    required: "Company is required"
  },
  trackingNumber: {
    type: String,
    maxlength: 995,
    minlength: 2,
    required: "tracking number is required"
  },
  status: {
    type: String,
    maxlength: 50,
    minlength: 1
  }
});

const delivaryInfoSchema = new mongoose.Schema({
  startedAt: {
    type: Date,
    default: Date.now
  },
  isDelivered: {
    type: Boolean
  },
  isCanceled: {
    type: Boolean
  },
  completedAt: {
    type: Date
  }
});

module.exports = {
  trackingSchema,
  delivaryInfoSchema,
  paymentSchema
};
