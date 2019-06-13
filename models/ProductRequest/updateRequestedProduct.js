const mongoose=require("mongoose");
const Joi=require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const {imageSchema,attrSchema,pricingSchema} = require("./schemas");

const updateRequestedProductSchema=new mongoose.Schema({
    productVariantId:{
        type:String,
        required:true
    },
    active:{
        type:Boolean,
        default:true
    },
    images:[
        {
            type:imageSchema,
            required:true
        }
    ],
    attrs:{
        type:attrSchema,    
    },
    pricing:{
        type:pricingSchema,
        required:true
    },
    saleLastDate:{
        type:Date,
    },
    lastSaleDate:{
        type:Date,
    }

});

const UpdateRequestedProduct = mongoose.model("UpdateRequestedProduct",updateRequestedProductSchema);

function validateUpdateRequestedProduct(updateRequestedProduct){
    const schema = {
        productVariantId:Joi.string().required(),
        active:Joi.boolean(),
        images:Joi.array().items(
            Joi.object().keys({
                src:Joi.string().min(5).max(900).required(),
                title:Joi.string().min(3).max(255),
                height:Joi.number().min(1).max(1200),
                width:Joi.number().min(1).max(1200)
            })
        ),
        attrs:Joi.object().keys({
            size:Joi.string().min(3).max(255),
            color_family:Joi.string().min(3).max(255),
            color:Joi.string().min(3).max(255),
            
        }),
        pricing:Joi.object().keys({
            price:Joi.number().required(),
            discountAmount:Joi.number(),
            discountAmountLastDate:Joi.date(),
            discountPercentage:Joi.number(),
            discountPercentageLastDate:Joi.date(),
            sale_price:Joi.number()
        }),
        saleLastDate:Joi.date(),
        lastSaleDate:Joi.date()
    };
    return Joi.validate(updateRequestedProduct ,schema,{
        abortEarly:false
    });
}

module.exports = {
    validateUpdateRequestedProduct ,
    UpdateRequestedProduct
}