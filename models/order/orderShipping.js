const mongoose=require("mongoose");
const Joi=require("joi");
Joi.objectId=require("joi-objectid")(Joi);

const {addressSchema}=require("./schemas");

const orderShippingSchema=new mongoose.Schema({
    customer_id:{
        type:String,
        maxlength:1000,
        minlength:5,
        required:"customer id is required"
    },
    customer_name:{
        type:String,
        maxlength:200,
        minlength:3,
        required:"customer name is required"
    },
    phone:{
        type:Number,
        required:"phone number is required"
    },
    address:{
        type:addressSchema,
        // required:"address is required"
    }
})
const OrderShipping=mongoose.model("orderShipping",orderShippingSchema);

function ValidateOrderShipping(orderShipping){
    const schema={
        customer_id:Joi.string().min(5).max(1000).required(),
        customer_name:Joi.string().min(3).max(200).required(),
        phone:Joi.number().required(),
        address:Joi.object().keys({
               country:Joi.string().max(40).min(2),//.required(),
                city:Joi.string().min(2).max(40),//.required(),
                state:Joi.string().min(2).max(40),
                street:Joi.string().min(1).max(40),//.required(),
                house:Joi.string().min(1).max(40),//.required(),
                floor:Joi.string().min(1).max(20),//.required()
        })

    };
    return Joi.validate(orderShipping,schema,{
        abortEarly:false
    })
}

module.exports={
    ValidateOrderShipping,OrderShipping
}