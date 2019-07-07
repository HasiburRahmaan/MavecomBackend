const mongoose = require("mongoose");
const Joi = require("joi");
Joi.ObjectId = require("joi-objectid")(Joi);


const similarProductSchema = mongoose.Schema({
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        unique: true,
        index: true, 
    },
    productList: [
        {
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                unique: true,   
            }
        }
    ]
}) 

const SimilarProduct = mongoose.model("SimilarProduct", similarProductSchema)

function validateSimilarProduct(objectSchema){

    const schema = {
        productId: Joi.ObjectId().required() , 
        productList: Joi.array().items({
            product: Joi.ObjectId().required()
        }).required()
    } 
    return Joi.validate(objectSchema, schema, { abortEarly: false }) 
} 


module.exports = {SimilarProduct, validateSimilarProduct}