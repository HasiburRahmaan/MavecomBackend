const Joi = require('joi');
const mongoose = require('mongoose');
Joi.ObjectId = require('joi-objectid')(Joi) 

const dimensionsSchema = mongoose.Schema({
    height:{
        type:Number,
        min: 1,
        required: true
    },
    width:{
        type:Number,
        min: 1,
        required: true
    },
    length:{
        type:Number,
        min: 1,
        required: true
    },
})
const shippingSchema = mongoose.Schema({
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },
    dimensions:{
        type: dimensionsSchema
    },
    weight:{
        type:Number,
        min: 1,
        required: true
    },
});

const Shipping = mongoose.model("Shipping", shippingSchema);

//Joi Validation
var dimensionsSchemaValidator = Joi.object().keys({
    height: Joi.number().min(1).required(),
    width: Joi.number().min(1).required(),
    length: Joi.number().min(1).required(),
})

function validateShipping(shipping){
    const schema = {
        productId: Joi.ObjectId().required(),
        dimensions: dimensionsSchemaValidator, 
        weight: Joi.number().min(1).required(),
    } 
    return Joi.validate(shipping, schema, {abortEarly: false});
}

module.exports = {Shipping, validateShipping}; 


//Testing Purpose
// var p = {
//     productId:"ProductId",
//     dimensions:{
//         height: 10,
//         width: 12,
//         length: 4
//     },
//     weight: 20
// }
// console.log(validateShipping(p))















