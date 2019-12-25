const mongoose = require("mongoose");
const Joi = require("joi")
Joi.objectId = require("joi-objectid")(Joi)


const singleOrderSchema = mongoose.Schema({
    _id: { //Order Id
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            variantId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true
            },
            quantity: {
                type: Number,
                min: 1
            },

        }
    ],
    status: {
        type: String,
        enum: ["pending", "cancelled", "returned"]
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    }
}, {
    timestamps: true
})

const TotalOrderSchema = mongoose.Schema({
    _id: {  //Seller Id
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    orders: [
        { type: singleOrderSchema }
    ]

})



const SellerOrders = mongoose.model("SellerOrders", TotalOrderSchema)
const singleOrderValidation = Joi.object().keys({
    _id: Joi.objectId().required(),
    products: Joi.array().items(Joi.object().keys(
        {
            productId: Joi.objectId().required(),
            variantId: Joi.objectId().required(),
            quantity: Joi.number().min(1),
        }
    )),
    status: Joi.string(),
    createdAt: Joi.date(),
    updatedAt: Joi.date()
})

function singleOrderValidator(object) {
    return Joi.validate(object, singleOrderValidation, { abortEarly: false })
}

function totalOrderValidator(object) {
    let schema = {
        _id: Joi.objectId().required(),
        orders: Joi.array().items(singleOrderValidation)
    }
    return Joi.validate(object, schema, { abortEarly: false })
}




module.exports = { SellerOrders, totalOrderValidator, singleOrderValidator }


//Test

// let schema = {
//     _id: "5d9dd06222bda03ed14df4bc",
//     orders: [
//         {
//             _id: "5d9dd06222bda03ed14df4bc",
//             products: [
//                 {
//                     productId: "5d9dd06222bda03ed14df4bc",
//                     variantId: "5d9dd06222bda03ed14df4bc",
//                     quantity: 5
//                 }
//             ],
//             status: "pending",

//         }
//     ]
// }

// console.log(totalOrderValidator(schema)) 