const Joi = require('joi');
const mongoose = require('mongoose');
Joi.ObjectId = require('joi-objectid')(Joi) 

const productBrandSchema = mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        unique: true, 
        ref: "Product",
    },
    brandId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Brand",
    }
}); 

const ProductBrand = mongoose.model("ProductBrand", productBrandSchema); 

function validateProductBrand(productBrand){
    const schema = {
        productId: Joi.ObjectId().required(),
        brandId: Joi.ObjectId().required(),
    } 
    return Joi.validate(productBrand, schema); 
}

module.exports = {ProductBrand, validateProductBrand} 