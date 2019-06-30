const mongoose = require("mongoose");
const Joi = require("joi");
const validator = require("validator");
Joi.objectId = require("joi-objectid");

var userInfoSchema = new mongoose.Schema({

    username:{
        type:String,
        maxlength:20,
        minlength:3,
        required:true,
        trim: true 
    },
    password:{
        type:String,
        maxlength:1024,
        minlength:6,
        required:true
    },
    email:{
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
        required: "Email address is required",
        validate: {
        validator: validator.isEmail,
        message: "Please enter a valid email address"
        },
        match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address"
        ]
    }
})

var imagesSchema = new mongoose.Schema({
    src:{
        type:String,
        maxlength:1000,
        minlength:3
    },
    height:{
        type:Number,
        min:1
    },
    width:{
        type:Number,
        min:1
    }
})

var assatesSchema = new mongoose.Schema({
    images:[{
        type:imagesSchema
    }],
    //phone field will be changed with proper validation
    phone: {
        type: String,
        maxlength: 11,
        minlength: 11
    }
})

var customerSchema = new mongoose.Schema({
    userInfo:{
        type:userInfoSchema,
        required:true
    },
    fullName: {
        type: String,
        maxlength: 50,
        minlength: 3,
        trim: true 
    },
    lFullName: {
        type: String,
        maxlength: 50,
        minlength: 3,
        lowercase: true,
        trim: true 

    },
    total_buy:{
        type:Number,
        min:0
    },
    religion:{
        type:String,
        maxlength:100,
        minlength:3 
    },
    gender:{
        type:String,
        maxlength:100,
        minlength:3
    },
    assets:{
        type:assatesSchema
    },
    isSeller:{
        type:Boolean
    },
    active:{
        type:Boolean
    },
    createdAt:{
        type: Date 
    },
    updatedAt:{
        type: Date
    }

}, {
    timestamps:true 
})

const Customer = mongoose.model("Customer",customerSchema);

function validateCustomer(customer){
    const schema={
        _id:Joi.objectId(),
        userInfo: Joi.object().keys({
            _id:Joi.objectId(),
            username: Joi.string().max(20).min(3).required(),
            password: Joi.string().max(1024).min(6).required(),
            email: Joi.string().email().required()
        }),
        fullName: Joi.string().max(50).min(3),
        lFullName: Joi.string().max(50).min(3),
        total_buy: Joi.number().min(0),
        religion: Joi.string().max(100).min(3),
        gender: Joi.string().max(100).min(3),
        assets: Joi.object().keys({
            images:Joi.array().items(
                    Joi.object().keys({
                    src: Joi.string().max(1000).min(3),
                    height: Joi.number().min(1),
                    width: Joi.number().min(1)
                })
            ),
            phone: Joi.string().max(11).min(11),
        }),
        isSeller: Joi.boolean(),
        active: Joi.boolean(),
        createdAt: Joi.Date(),
        updatedAt: Joi.Date()
    }
    return Joi.validate(customer,schema,{abortEarly: false});
}
module.exports = {Customer,validateCustomer};