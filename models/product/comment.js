const Joi = require("joi");
const mongoose = require("mongoose");
Joi.ObjectId = require("joi-objectid")(Joi);

const customerSchema = mongoose.Schema({
  _id: {  //id become _id
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer", //Using reference from customer 
    required: true
  },
  name: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: true,
    trim: true
  },
  profilePicture: {
    type: String,
    minlength: 1,
  }
});

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
  liked: {
    type: Number,
    default: 0
  },
  disLiked: {
    type: Number,
    default: 0
  },
  likedBy: [
    {
      type: customerSchema
    }
  ],
  dislikedBy: [
    {
      type: customerSchema
    }
  ],
  createdAt: {
    type: Date,
    default: new Date()
  },
  updatedAt: {
    type: Date
  }
});

const productSchema = mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  },
  VarientId: {
    type: String,
    minlength: 1,
    maxlength: 100,
    required: true
  }
});

const replySchema = mongoose.Schema({
  active: {
    type: Boolean,
    default: true
  },
  customer: {
    type: customerSchema
  },
  comment: {
    type: commentSchema
  }
});

const productCommentSchema = mongoose.Schema({
  product: {
    type: productSchema
  },
  total_comments: {
    type: Number,
    default: 0
  },
  comments: [
    {
      active: {
        type: Boolean,
        default: true
      },
      customer: {
        type: customerSchema //mongoose.Schema.Types.ObjectId,
        // ref: "Customer"
      },
      comment: {
        type: commentSchema
      },
      replies: [
        {
          type: replySchema
        }
      ]
    }
  ]
});

const ProductComment = mongoose.model("ProductComment", productCommentSchema);

//Joi Validation functions
var customerSchemaValidator = Joi.object().keys({
  _id: Joi.ObjectId(), // id become _id
  name: Joi.string()
    .min(3)
    .max(50)
    .required(),
  profilePicture: Joi.string()
});

var commentSchemaValidator = Joi.object().keys({
  text: Joi.string()
    .min(1)
    .max(1000),
  images: Joi.array().items(Joi.string().min(1)),
  liked: Joi.number(),
  disLiked: Joi.number(),
  likedBy: Joi.array().items(customerSchemaValidator),
  disLikedBy: Joi.array().items(customerSchemaValidator),
  createdAt: Joi.date(),
  updatedAt: Joi.date()
});

var replySchemaValidator = Joi.object().keys({
  active: Joi.boolean(),
  customer: customerSchemaValidator,
  comment: commentSchemaValidator
});

//Object of comment array
var commentValidator = Joi.object().keys({
  active: Joi.boolean(),
  customer: customerSchemaValidator,
  comment: commentSchemaValidator,
  replies: Joi.array().items(replySchemaValidator)
});

function validateProductComment(productComment) {
  const schema = {
    product: Joi.object().keys({
      id: Joi.ObjectId(),
      VarientId: Joi.string()
        .min(1)
        .max(100)
        .required()
    }),
    total_comments: Joi.number(),
    comments: Joi.array().items(commentValidator)
  };
  return Joi.validate(productComment, schema, { abortEarly: false });
}

function validateSingleComment(comment) {
  return Joi.validate(comment, commentValidator, { abortEarly: false });
}
function validateSingleReply(reply) {
  return Joi.validate(reply, replySchemaValidator, { abortEarly: false })
}

module.exports = {
  ProductComment,
  validateProductComment,
  validateSingleComment,
  validateSingleReply
};
// Testing purpose
// ==========================
// var productCommentDemo = {
//     product: {
//         id: "productId",
//         VarientId: "varientId"
//     },
//     total_comments: 10,
//     comments:[
//         {
//             active: true,
//             customer: {
//                 id: "commenterId",
//                 name: "commenterName",
//                 profilePicture: "commenterProPicId"
//             },
//             comment: {
//                 text: "comment",
//                 images: [
//                     "imageOne", "imageTwo"
//                 ],
//                 liked: 19,
//                 disLiked: 10,
//                 likedBy: [
//                     {
//                         id: "likerOnerId",
//                         name: "likerOneName",
//                         profilePicture: "likerOneProPicId"
//                     },
//                     {
//                         id: "likerOnerId",
//                         name: "likerOneName",
//                         profilePicture: "likerOneProPicId"
//                     }
//                 ],
//                 disLikedBy: [{
//                     id: "disLikerOnerId",
//                     name: "disLikerOneName",
//                     profilePicture: "disLikerOneProPicId"
//                 }],
//             },
//             replies: [{
//                 active: true,
//                 customer: {
//                      id: "commenterId",
//                      name: "commenterName",
//                      profilePicture: "commenterProPicId"
//                  },
//                  comment: {
//                      text: "comment",
//                      images: [
//                          "imageOne", "imageTwo"
//                      ],
//                      liked: 19,
//                      disLiked: 10,
//                      likedBy: [
//                          {
//                              id: "likerOnerId",
//                              name: "likerOneName",
//                              profilePicture: "likerOneProPicId"
//                          },
//                          {
//                              id: "likerOnerId",
//                              name: "likerOneName",
//                              profilePicture: "likerOneProPicId"
//                          }
//                      ],
//                      disLikedBy: [{
//                          id: "disLikerOnerId",
//                          name: "disLikerOneName",
//                          profilePicture: "disLikerOneProPicId"
//                      }],
//                  },

//              }],

//         }
//     ]
// };
// var productCommentModel = new ProductComment(productCommentDemo);
// // console.log(validateProductComment(productCommentDemo));
// console.log(productCommentModel.comments[0].comment.createdAt)
