const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

var sellerInfoSchema = mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    },
    total_sale: {
        type: Number,
        min: 0
    },
    rank: {
        type: Number,
        min: 0
    }
})

const SellerInfo = mongoose.model("SellerInfo", sellerInfoSchema);

function validationSellerInfo(sellerInfo) {
    const schema = {
        customerId: Joi.objectId(),
        total_sale: Joi.number().min(0),
        rank: Joi.number().min(0)
    }
    return Joi.validate(sellerInfo, schema, { abortEarly: false });
}
module.exports = { SellerInfo, validationSellerInfo };