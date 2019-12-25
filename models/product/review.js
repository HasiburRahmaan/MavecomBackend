const mongoose = require('mongoose')
const Joi = require('joi')
Joi.ObjectId = require("joi-objectid")(Joi);

// const customerSchema = mongoose.Schema({
//     _id: {  //id become _id
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Customer", //Using reference from customer 
//         required: true,
//     },
//     name: {
//         type: String,
//         minlength: 3,
//         maxlength: 50,
//         required: true,
//         trim: true
//     },
//     profilePicture: {
//         type: String,
//         minlength: 1,
//     }
// });

const commentSchema = mongoose.Schema({
    text: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 1000
    },
    images: [
        {
            type: String,
            minlength: 1
        }
    ],

    likedBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer",
        }
    ],
    dislikedBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer",
        }
    ],
    createdAt: {
        type: Date
    }
}, {
    timestamps: true
}
);

const reviewSummerySchema = mongoose.Schema({
    totalRating: {
        type: Number,
        min: 0
    },
    totalReview: {
        type: Number,
        min: 0
    },
    ratings: {
        5: {
            type: Number,
            min: 0
        },
        4: {
            type: Number,
            min: 0
        },
        3: {
            type: Number,
            min: 0
        },
        2: {
            type: Number,
            min: 0
        },
        1: {
            type: Number,
            min: 0
        },

    }
})

const productReviewSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    reviews: [
        {
            customer: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Customer", //Using reference from customer 
                required: true,
            },
            comment: {
                type: commentSchema
            },
            rating: {
                type: Number,
                min: 1,
                max: 5
            }
        }
    ],
    reviewSummery: {
        type: reviewSummerySchema
    },
    //List of user who already has given review on this product
    userList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer", //Using reference from customer 
        }
    ]


});

const ProductReview = mongoose.model("ProductReview", productReviewSchema);

//Joi Validation functions
// const customerSchemaValidator = Joi.object().keys({
//     _id: Joi.ObjectId(), // id become _id
//     name: Joi.string()
//         .min(3)
//         .max(50)
//         .required(),
//     profilePicture: Joi.string()
// });

const commentSchemaValidator = Joi.object().keys({
    text: Joi.string()
        .min(1)
        .max(1000),
    images: Joi.array().items(Joi.string().min(1)),
    likedBy: Joi.array().items(Joi.ObjectId()),
    disLikedBy: Joi.array().items(Joi.ObjectId()),
})

const reviewSchemaValidator = Joi.object().keys({
    _id: Joi.ObjectId(),
    customer: Joi.ObjectId(),
    comment: commentSchemaValidator,
    rating: Joi.number().min(1).max(5)
})

const reviewSummeryValidator = Joi.object().keys({
    totalRating: Joi.number().min(0),
    totalReview: Joi.number().min(0),
    ratings: Joi.object({
        "5": Joi.number().min(0),
        "4": Joi.number().min(0),
        "3": Joi.number().min(0),
        "2": Joi.number().min(0),
        "1": Joi.number().min(0),
    })
})

function validateProductReview(object) {
    schema = {
        _id: Joi.ObjectId(),
        reviews: Joi.array().items(reviewSchemaValidator),
        reviewSummery: reviewSummeryValidator,
        userList: Joi.array().items(Joi.ObjectId())
    }

    return Joi.validate(object, schema, { abortEarly: false })
}

function validateSingleReview(object) {
    return Joi.validate(object, reviewSchemaValidator, { abortEarly: false })
}

module.exports = { ProductReview, validateProductReview, validateSingleReview }


//Test Object
// let test = {
//     "_id": "5d93079beb5fec17c3be3c36",
//     "customer_id": "5d91bde778785a2e35c77f8a",
//     "comment": {
//         "text": "a review"
//     },
//     "rating": "3"
// }

// let test2 = {
//     "_id": "5d9dd06222bda03ed14df4bc",
//     "reviews": [
//         {
//             "customer": {
//                 "name": "Rafshanul hoque",
//                 "profilePicture": "/home/siam88/Pictures/pictures/apple-black-and-white-camera-196659.jpg"
//             },
//             "comment": {
//                 "images": [],
//                 "text": "a review",
//                 "likedBy": [],
//                 "disLikedBy": []

//             },
//             "rating": 3
//         }
//     ],
//     "reviewSummery": {
//         "totalRating": 4200,
//         "totalReview": 1000,
//         "ratings": {
//             "5": 10,
//             "4": 10,
//             "3": 10,
//             "2": 10,
//             "1": 10,
//         }
//     },
//     "userList": [
//         "5d9dd06222bda03ed14df4bc",
//         "5d9dd06222bda03ed14df4bc"
//     ]
// }

// console.log(new ProductReview(test2))
// console.log(validateProductReview(test2))


