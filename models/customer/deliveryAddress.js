const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

var deliveryAddressSchema = mongoose.Schema({
    customerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    },
    country:{
        type:String,
        maxlength:255,
        minlength:3,
        required:true
    },
    city:{
        type:String,
        maxlength:255,
        minlength:3,
        required:true
    },
    state:{
        type:String,
        maxlength:255,
        minlength:0
    },
    division:{
        type:String,
        maxlength:255,
        minlength:3,
        required:true
    },
    thana:{
        type:String,
        maxlength:255,
        minlength:3,
        required:true
    },
    ward:{
        type:String,
        maxlength:255,
        minlength:3
    },
    road:{
        type:String,
        maxlength:255,
        minlength:0
    },
    house:{
        type:String,
        maxlength:255,
        minlength:0
    },
    floor:{
        type:String,
        maxlength:255,
        minlength:0
    },
    description:{
        type:String,
        maxlength:1000,
        minlength:3
    }
})

const DeliveryAddress = mongoose.model("DeliveryAddress",deliveryAddressSchema);

function validationDeliveryAddress(deliveryAddress){
    const schema = {
        customerId: Joi.objectId(),
        country: Joi.string().max(255).min(3).required(),
        city: Joi.string().max(255).min(3).required(),
        state: Joi.string().max(255).min(0),
        division: Joi.string().max(255).min(3).required(),
        thana: Joi.string().max(255).min(3).required(),
        ward: Joi.string().max(255).min(3),
        road: Joi.string().max(255).min(0),
        house: Joi.string().max(255).min(0),
        floor: Joi.string().max(255).min(0),
        description: Joi.string().max(1000).min(3)
    }
    return Joi.validate(deliveryAddress,schema,{abortEarly: false});
}
module.exports = {DeliveryAddress,validationDeliveryAddress}