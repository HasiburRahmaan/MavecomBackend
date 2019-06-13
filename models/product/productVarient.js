const mongoose = require('mongoose');
const Joi = require('joi'); 
Joi.ObjectId = require('joi-objectid')(Joi) 


const pricingSchema = mongoose.Schema({
    price:{
        type:Number,
        required: true
    },
    discountAmount:{
        type:Number,
        default: 0
    },
    discountAmountLastDate:{
        type:Date 
    },
    discountPersentage:{
        type:Number,
        default: 0
    },
    discountPersentageLastDate:{
        type:Date
    }, 
    sale_price:{
        type:Number,
        required: true 
    }
})

const attrsSchema=mongoose.Schema({
    size:{
        type:String,
        minlength:1,
        required: true 
    },
    color_family:{
        type:String,
        minlength:1, 
    },
    color:{
        type:String,
        minlength:1,
    },
    quantity:{
        type:Number,
        default: 0
    }
})

const imageSchema = mongoose.Schema({
    src:{
        type: String,
        minlength: 2,
        required: true
    },
    title:{
        type: String,
        minlength: 2,
        maxlength: 100,
    },
    height:{
        type:Number,
        min:1,
        required: true 
    },
    width:{
        type:Number,
        min:1,
        required: true 
    }
})

const product_infoSchema = mongoose.Schema({
    productVariantId:{
        type: String,
        minlength: 2,
        maxlength: 100,
    },
    rating:{
        type:Number,
        min:1,
        max:5
    },
    active:{
        type:Boolean,
        default:true 
    },
    images: [{
        type:imageSchema
    }],
    attrs:{
        type: attrsSchema
    },
    pricing:{
        type:pricingSchema
    },
    saleLastDate:{
        type:Date
    },
    lastSaleDate:{
        type:Date
    }
});

const varientSchema = mongoose.Schema({
    created_at:{
        type:Date,
        default: new Date()
    },
    updated_at:{
        type:Date 
    },
    products_info:{
        type: product_infoSchema
    }
})

const productVarientSchema = mongoose.Schema({
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required:true
    },
    count:{
        type:Number,
        min:1,
        required:true
    },
    varient:{
        type:varientSchema,
    }
}) 


const ProductVarient = mongoose.model("ProductVarient", productVarientSchema);

//Validator Functions

const pricingSchemaValidator = Joi.object().keys({
    price:Joi.number().required(),
    discountAmount:Joi.number(),
    discountAmountLastDate:Joi.date(),
    discountPersentage: Joi.number(),
    discountPersentageLastDate: Joi.date(), 
    sale_price: Joi.number().required()  
});

const attrsSchemaValidator = Joi.object().keys({
    size: Joi.string().min(1).required(), 
    color_family: Joi.string().min(1),
    color: Joi.string().min(1),
    quantity:Joi.number()
})

const imageSchemaValidator = Joi.object().keys({
    src: Joi.string().min(2).required(),
    title: Joi.string().min(2).max(100),
    height: Joi.number().min(1).required(),
    width: Joi.number().min(1).required()
})

const products_infoSchemaValidator = Joi.object().keys({
    productVariantId: Joi.string().min(2).max(100),
    rating: Joi.number().min(1).max(5), 
    active: Joi.boolean(),
    images: Joi.array().items(imageSchemaValidator), 
    attrs: attrsSchemaValidator,
    pricing: pricingSchemaValidator,
    saleLastDate: Joi.date(),
    lastSaleDate: Joi.date() 
});

const varientSchemaValidator = Joi.object().keys({
    created_at:Joi.date(),
    updated_at: Joi.date(),
    products_info: products_infoSchemaValidator

})

function validateProductVarient(productVarient){
    const schema = {
        productId: Joi.ObjectId().required(), 
        count : Joi.number().min(1).required(),
        varient: varientSchemaValidator,
    };
    return(Joi.validate(productVarient, schema)); 
} 

module.exports = {ProductVarient, validateProductVarient};



//Testing Purpose

// var productVarientDemo = {
//     productId : "productId",
//     count: 10,
//     varient:{
//         created_at: new Date(),
//         products_info: {
//             productVariantId: "productVarientId",
//             rating: 5,
//             active: true,
//             images:[
//                 {
//                     src:"ImageOneSrc",
//                     title:"ImageOne",
//                     height:300,
//                     width: 200
//                 },
//                 {
//                     src:"ImageTwoSrc",
//                     title:"ImageTwo",
//                     height:400,
//                     width: 500
//                 }
//             ],
//             attrs:{
//                 size: "attrsSize",
//                 color_family: "colorFamily",
//                 color: "Pink",
//                 quantity: 10
//             },
//             pricing:{
//                 price: 600,
//                 discountAmount: 50,
//                 discountAmountLastDate: new Date(),
//                 discountPersentage: 0,
//                 discountPersentageLastDate: 0 ,
//                 sale_price: 750
//             }, 
//             saleLastDate: 0, 
//             lastSaleDate: 0
//         }
//     }
// } 
// const productVarientModel = new ProductVarient(productVarientDemo);
// // console.log(validateProductVarient(productVarientModel))
// console.log(productVarientModel)