const Joi = require("joi");
const mongoose = require("mongoose");
Joi.ObjectId = require("joi-objectid")(Joi);



const cartSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId, // UserId will be the default id
        ref: "Customer", //Using reference from customer 
        required: true
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product", //Using reference from customer 
                required: true
            },
            variantId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true
            },
            cartQuantity: {
                type: Number,
                min: 1,
                default: 1
            }
        }
    ]
})

const Cart = mongoose.model("Cart", cartSchema)

const productValidator = Joi.object().keys(
    {
        productId: Joi.ObjectId().required(),
        variantId: Joi.ObjectId().required(),
        cartQuantity: Joi.number().min(1)
    }
)
function validateCart(object) {
    const schema = {
        _id: Joi.ObjectId().required(),
        products: Joi.array().items(
            productValidator
        )
    }
    return Joi.validate(object, schema, { abortEarly: false })
}

function validateProduct(object) {
    return Joi.validate(object, productValidator, { abortEarly: false })
}

module.exports = { Cart, validateCart, validateProduct }

//TestObject


// let schema = {
//     _id: "5d91bde778785a2e35c77f8a",
//     product: [
//         {
//             productId: "5d9dd06222bda03ed14df4bc",
//             variantId: "5d9dd06222bda03ed14df4bc",
//             cartQuantity: 2
//         },
//         {
//             productId: "5d9dd06222bda03ed14df4bc",
//             variantId: "5d9dd06222bda03ed14df4bc",
//             cartQuantity: 2
//         }
//     ]
// }



// console.log("====>", validateCart(schema))