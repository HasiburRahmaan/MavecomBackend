const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const topPreferableSellerSchema = mongoose.Schema({
    customerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    },
    sellerList:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    }]
})

const TopPreferableSeller = mongoose.model("TopPreferableSeller",topPreferableSellerSchema);

function validationTopPreferableSeller(topPreferableSeller){
    const schema = {
        customerId: Joi.objectId(),
        sellerList:Joi.array().items(
            Joi.objectId()
        )
    }
    return Joi.validate(topPreferableSeller,schema,{abortEarly: false});
}
module.exports = {TopPreferableSeller,validationTopPreferableSeller};