const Joi = require('joi');
const mongoose = require('mongoose'); 
Joi.ObjectId = require('joi-objectid')(Joi) 

const productDescriptionSchema = mongoose.Schema({
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    description:{
        type: String,
        minlength: 10,
        maxlength: 2000,
    }
}) 

const ProductDescription = mongoose.model("ProductDescription", productDescriptionSchema)

function validateProductDescription(productDescription){
    const schema = {
        productId: Joi.ObjectId().required(),
        description: Joi.string().min(10).max(2000)
    } 
    return Joi.validate(productDescription, schema, {abortEarly:false}); 
} 

module.exports = {ProductDescription, validateProductDescription}; 

// var testModel = {
//     productId: "abc",
//     description: "kdkdkdkdkdkdkdkdkdkdk"
// } 

// console.log(validateProductDescription(testModel)) 