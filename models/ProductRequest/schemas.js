const mongoose=require("mongoose");
const Joi=require("joi");
Joi.objectId=require("joi-objectid")(Joi);
const verifySchema=new mongoose.Schema({
    accepted:{
        type:Boolean,
       
    },
    canceled:{
        type:Boolean,
        
    },
    date:{
        type:Date,
        default:Date.now
        
    },
    verified:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})


const imageSchema=new mongoose.Schema({
    src:{
        type: String,
        maxlength: 900,
        minlength: 5,
        required:"Image source required"
    },
    title:{
        type: String,
        maxlength: 255,
        minlength: 3,
    },
    height:{
        type: Number,
	maxlength:1200,
	minlength: 1
    },
    width:{
        type: Number,
	maxlength:1200,
	minlength: 1
    }
});

const attrSchema=new mongoose.Schema({
    size:{
        type: String,
        maxlength: 255,
        minlength: 3, 
    },
    color_family:{
        type: String,
        maxlength: 255,
        minlength: 3,
    },
    color:{
        type: String,
        maxlength: 255,
        minlength: 3,  
    },
    
})

const pricingSchema=new mongoose.Schema({
    price:{
        type: Number,
        required: true
    },
    discountAmount:{
        type:Number,    
    },
    discountAmountLastDate:{
        type:Date,    
    },
    discountPercentage:{
        type:Number,   
    },
    discountPercentageLastDate:{
        type:Date,
    },
    sale_price:{
        type:Number,
        
    }
})

module.exports={verifySchema,imageSchema,attrSchema,pricingSchema}