const mongoose=require("mongoose");
const Joi=require("joi");
Joi.objectId=require("joi-objectid")(Joi);

const paymentSchema=new mongoose.Schema({
   method:{
       type:String,
       maxlength:100,
       minlength:2,
       required:"method is required"
   } ,
   transiction_id:{
       type:String,
       maxlength:900,
       minlength:5,
       required:"transiction id is required"
   }

})

const trackingSchema=new mongoose.Schema({
    company:{
        type:String,
        maxlength:100,
        minlength:2,
        required:"Company is required"
    },
    tracking_number:{
        type:String,
        maxlength:995,
        minlength:2,
        required:"tracking number is required"
    },
    status:{
        type:String,
        maxlength:50,
        minlength:1
    }
})

const delivaryInfoSchema=new mongoose.Schema({
    started_at:{
        type:Date,
        default:Date.now
    },
    isDelivered:{
        type:Boolean,
    },
    isCanceled:{
        type:Boolean
    },
    ended_at:{
        type:Date,
        required:"delivery ended date required "
    }
})

const addressSchema=new mongoose.Schema({
    country:{
        type:String,
        maxlength:40,
        minlength:2,
        required:"Country is required"
    },
    city:{
        type:String,
        maxlength:40,
        minlength:2,
        required:"city is required"
    },
    state:{
        type:String,
        maxlength:40,
        minlength:2,
        
    },
    street:{
        type:String,
        maxlength:40,
        minlength:1,
        required:"street is required"
    },
    house:{
        type:String,
        maxlength:40,
        minlength:1,
        required:"house is required"
    },
    floor:{
        type:String,
        maxlength:20,
        minlength:1,
        required:"floor is required"

    }
})

module.exports={addressSchema,trackingSchema,delivaryInfoSchema,paymentSchema}