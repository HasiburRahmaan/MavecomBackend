const Joi = require('joi');
const mongoose = require('mongoose'); 
Joi.ObjectId = require('joi-objectid')(Joi) 

const hotProducstSchema = mongoose.Schema({
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
        unique: true
    },
    note:{
        type: String,
        minlength: 10,
        maxlength: 2000,
    }
}) 

const HotProducts = mongoose.model("HotProducts", hotProducstSchema)

function validateHotProducts(HotProducts){
    const schema = {
        productId: Joi.ObjectId().required(),
        note: Joi.string().min(10).max(2000)
    } 
    return Joi.validate(HotProducts, schema, {abortEarly:false}); 
} 

module.exports = {HotProducts, validateHotProducts}; 

//Test Purpose
// var testModel = {
//     productId: "abc",
//     note: "kdkdkdkdkdkdkdkdkdkdk"
// } 
// console.log(validateHotProducts(testModel)) 