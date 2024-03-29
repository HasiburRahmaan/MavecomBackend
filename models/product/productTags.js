const mongoose = require('mongoose');
const Joi = require('joi');
Joi.ObjectId = require('joi-objectid')(Joi) 


const productTagSchema = mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },
    tagId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Tag"
    }
}) 

productTagSchema.index({productId: 1, tagId: 1},{unique: true})  

const ProductTag = mongoose.model("ProductTag", productTagSchema);

function validateProductTag(ProductTag){
    const schema = {
        productId: Joi.ObjectId(),
        tagId: Joi.ObjectId()
    } 
    return Joi.validate(ProductTag, schema); 
}

module.exports = {ProductTag, validateProductTag}




