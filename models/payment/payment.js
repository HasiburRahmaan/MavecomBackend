const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const Payment = mongoose.model(
  "Payment",
  new mongoose.Schema({
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order"
    },
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
    },
    amount: {
      type: Number,
      min: 1,
      required: true
    }
  })
);

const validatePayment = payment => {
  const schema = {
    orderId: Joi.ObjectId().required(),
    method: Joi.string()
      .min(3)
      .max(30),
    transiction_id: Joi.string()
      .min(1)
      .max(50),
    amount: Joi.number().min(1)
  };

  return Joi.validate(payment, schema);
};

module.exports = { validatePayment, Payment };
