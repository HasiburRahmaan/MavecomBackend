const mongoose=require("mongoose");
const Joi=require("joi");
Joi.objectId=require("joi-objectid")(Joi);

const orderProductsSchema=new mongoose.Schema({
    sellerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Customer",
        required:"seller id is required"
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:"product id is required"
    },
    productVariantId:{
       type:String,
       maxlength:1000,
       minlength:5,
        required:"ProductVarient is required"
    },
    title:{
        type:String,
        minlength:2,
        maxlength:50
        
    },
    quantity:{
        type:Number,
        required:"quantity is required"
    },
    unit_price:{
        type:Number,
        required:"unit price is required"
    },
    discount_amount:{
        type:Number,
        
    },
    discount_percentage:{
        type:Number,
        maxlength:100,
        minlength:1
    }
})

const OrderProduct=mongoose.model("OrderProduct",orderProductsSchema);

function ValidateOrderedProduct(orderProduct){
    const schema={
        sellerId:Joi.objectId().required(),
        productId:Joi.objectId().required(),
        productVariantId:Joi.string().min(5).max(1000).required(),
        title:Joi.string().min(2).max(50),
        quantity:Joi.number().required(),
        unit_price:Joi.number().required(),
        discount_amount:Joi.number(),
        discount_percentage:Joi.number().min(1).max(100)
    };
    return Joi.validate(orderProduct,schema,{
        abortEarly:false
    });
}

module.exports={
    ValidateOrderedProduct,
    OrderProduct
}