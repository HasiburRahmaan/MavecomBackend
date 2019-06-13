const mongoose=require("mongoose");
const Joi=require("joi");
Joi.objectId=require("joi-objectid")(Joi);

const {verifySchema}=require("./schemas");

const productUpdateRequestSchema=new mongoose.Schema({
    createdAt:{
        type:Date,
        default: Date.now,
      
    },
    updatedAt:{
        type:Date,
        default: Date.now,

    },
    seller:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Customer"
    },
    products_info:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"RequestedProduct"
        }
    ],
    verify:{
        type:verifySchema,
        
    }  
})

const ProductUpdateRequest=mongoose.model("ProductUpdateRequest",productUpdateRequestSchema);

function validateproductUpdateRequest(productUpdateRequest){
    const schema={
        createdAt:Joi.date(),
        updatedAt:Joi.date(),
        seller:Joi.objectId().required(),
        products_info:Joi.array().items(Joi.objectId()).required(),
        verify:Joi.object().keys({
            accepted:Joi.boolean(),
            canceled:Joi.boolean(),
            date:Joi.date(),
            verified:Joi.string()
        })
    };
    return Joi.validate(productUpdateRequest, schema, {
        abortEarly:false
    });
}

module.exports={
    validateproductUpdateRequest,
    ProductUpdateRequest
}