const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

var orderStatusInfoSchema = mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    },
    total: {
        type: Number,
        min: 0
    },
    completed: {
        type: Number,
        min: 0
    },
    Canceled: {
        type: Number,
        min: 0
    },
    pending: {
        type: Number,
        min: 0
    },
    refund: {
        type: Number,
        min: 0
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    }
}, {
    timestamps: true
})

const OrderStatusInfo = mongoose.model("OrderStatusInfo", orderStatusInfoSchema);

function validateOrderStatusInfo(orderStatusInfo) {
    const schema = {
        customerId: Joi.objectId(),
        total: Joi.number().min(0),
        completed: Joi.number().min(0),
        Canceled: Joi.number().min(0),
        pending: Joi.number().min(0),
        refund: Joi.number().min(0),
    }
    return Joi.validate(orderStatusInfo, schema, { abortEarly: false });
}

module.exports = { OrderStatusInfo, validateOrderStatusInfo }