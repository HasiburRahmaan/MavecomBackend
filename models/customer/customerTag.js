const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const customertagSchema = mongoose.Schema({
    tagId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag"
    },
    customerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    }
})

const CustomerTag = mongoose.model("CustomerTag",customertagSchema);

function validationCustomertag(cuatomerTag){
    const schema = {
        tagId: Joi.objectId(),
        customerId: Joi.objectId()
    }
    return Joi.validate(cuatomerTag,schema,{abortEarly: false});
}
module.exports = {CustomerTag,validationCustomertag};