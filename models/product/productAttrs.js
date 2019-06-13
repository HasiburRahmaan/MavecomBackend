const mongoose = require('mongoose');
const Joi = require('joi');
Joi.ObjectId = require('joi-objectid')(Joi) 


const productAttrsSchema = mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },
    attrId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Attrs"
    }
}) 

const ProductAttrs = mongoose.model("ProductAttrs", productAttrsSchema);

function validateProductAttrs(productAttrs){
    const schema = {
        productId: Joi.ObjectId(),
        attrId: Joi.ObjectId()
    } 
    return Joi.validate(productAttrs, schema); 
}

module.exports = {ProductAttrs, validateProductAttrs}
















//Testing purpose
// ==========================
// const express = require("express");
// const app = express();

// var productAttr = {
//     productId: "ProductId",
//     attrId: "attrId"
// }
// console.log(validateProductAttrs(productAttr))