const Joi = require("joi");
const mongoose = require("mongoose");
Joi.ObjectId = require("joi-objectid")(Joi);

const shippingSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  },
  height: {
    type: Number,
    min: 0.01,
    required: true
  },
  width: {
    type: Number,
    min: 0.01,
    required: true
  },
  length: {
    type: Number,
    min: 0.01,
    required: true
  },
  weight: {
    type: Number,
    min: 0.01,
    required: true
  },
  warehouseAddresses: [mongoose.Schema.Types.ObjectId]
});

const Shipping = mongoose.model("Shipping", shippingSchema);

function validateShipping(shipping) {
  const schema = {
    _id: Joi.ObjectId().required(),
    height: Joi.number()
      .min(1)
      .required(),
    width: Joi.number()
      .min(1)
      .required(),
    length: Joi.number()
      .min(1)
      .required(),
    weight: Joi.number()
      .min(0.01)
      .required(),
    warehouseAddresses: Joi.array().items(Joi.ObjectId())
  };
  return Joi.validate(shipping, schema, { abortEarly: false });
}

module.exports = { Shipping, validateShipping };

//Testing Purpose
// var p = {
//   productId: "ProductId",
//   dimensions: {
//     height: 10,
//     width: 12,
//     length: 4
//   },
//   weight: 20,
//   warehouseAddresses: ["dhaka", "rungpur"]
// };
// console.log(validateShipping(p));
