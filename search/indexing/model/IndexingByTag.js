const mongoose = require('mongoose');
const Joi = require('joi');
Joi.ObjectId = require('joi-objectid')(Joi); 

const productSchema = mongoose.Schema({
        productId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        }
})
const tagWithProductListSchema = mongoose.Schema({
    tag:{
        type: String,
        min: 2,
        unique: true,
        trim: true,
        index: true, 
        required: true 
    },
    productList:[
        {
            type: productSchema
        }
    ]
}) 


const ProductListByTag = mongoose.model('ProductListByTag', tagWithProductListSchema); 

function validateProductListByTag(value){
    const schema = {
        tag: Joi.string().min(2).required(),
        productList: Joi.array().items(
           Joi.object().keys({
               productId:Joi.ObjectId()  
           })
        )
    } 
    return Joi.validate(value, schema) 
}

module.exports = {ProductListByTag, validateProductListByTag}; 
