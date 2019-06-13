const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const keywordListSchema = mongoose.Schema({
    keyword:{
        type:String,
        maxlength:1000,
        minlength:0,
    },
    searched:{
        type: Number,
        min:0
    }
})

const customerSearchKeywordsSchema = mongoose.Schema({
    customerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    },
    keywordList:[{
        type:keywordListSchema
    }]
})

const CustomerSearchKeywords = mongoose.model("CustomerSearchKeywords",customerSearchKeywordsSchema);

function validateCustomerSearchKeywords(customerSearchKeywords){
    const schema = {
        customerId: Joi.objectId(),
        keywordList:Joi.array().items(
            Joi.object().keys({
                keyword: Joi.string().max(1000).min(0),
                searched: Joi.number().min(0)
            })
        )
    }
    return Joi.validate(customerSearchKeywords,schema,{abortEarly: false});
}
module.exports = {CustomerSearchKeywords,validateCustomerSearchKeywords};