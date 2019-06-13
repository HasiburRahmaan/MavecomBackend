const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const topProductSchema = mongoose.Schema({
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    productVarientId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductVariantId"
    },
    total_buy:{
        type: Number,
        min:0
    }
})

const topPreferableProductSchema = mongoose.Schema({
    customerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    },
    topProduct:[{
        type:topProductSchema
    }]
})

const TopPreferableProduct = mongoose.model("TopPreferableProduct",topPreferableProductSchema);

function validationTopPreferableProduct(topPreferableProduct){
    const schema = {
        customerId: Joi.objectId(),
        keywordList:Joi.array().items(
            Joi.object.keys({
                productId: Joi.objectId(),
                productVarientId: Joi.objectId(),
                total_buy: Joi.number().min(0)
            })
        )
    }
    return Joi.validate(topPreferableProduct,schema,{abortEarly: false});
}
module.exports ={TopPreferableProduct,validationTopPreferableProduct};