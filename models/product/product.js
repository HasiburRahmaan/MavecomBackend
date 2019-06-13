const mongoose = require("mongoose");
const Joi = require("joi");
Joi.ObjectId = require("joi-objectid")(Joi);

const thumbnail_imageschema = mongoose.Schema({
  height: {
    type: Number,
    min: 10,
    max: 100
  },
  width: {
    type: Number,
    min: 10,
    max: 100
  },
  title: {
    type: String,
    minlength: 4,
    maxlength: 100
  },
  src: {
    type: String,
    minlength: 10,
  }
});

const assetsSchema = mongoose.Schema({
  thumbnail_images: [
    {
      type: thumbnail_imageschema
    }
  ]
});

const productSchema = mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 100,
    required: true,
    trim: true,
  },
  lName: {
    type: String,
    minlength: 2,
    maxlength: 100,
    trim: true,
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department"
    // default: "GenerelDept"
  },
  category: {
    type: String,
    minlength: 2,
    maxlength: 100,
    required: true,
    trim: true,
  },
  total_stock: {
    type: Number,
    default: 0
  },
  priceRange: {
    type: [Number],
    validate: [rangeArrayLimit]
  },
  brandName: {
    type: String,
    minlength: 2,
    maxlength: 100,
    trim: true,
  },
  assets: {
    type: assetsSchema
  },
  discountAmount: {
    type: Number,
    default: 0
  },
  discountPercentage: {
    type: Number,
    default: 0
  },
  shortDetails: {
    type: String,
    minlength: 2,
    maxlength: 100,
    trim: true,
  }
},{
  timestamps: true 
});

//validation function for price range array
function rangeArrayLimit(val) {
  return val.length == 2;
}

const Product = mongoose.model("Product", productSchema);

function validateProduct(product) {
  const schema = {
    name: Joi.string()
      .min(2)
      .max(100)
      .required(),
    lName: Joi.string()
      .min(2)
      .max(100),
      
    department: Joi.ObjectId(),
    category: Joi.string()
      .min(2)
      .max(100)
      .required(),
    total_stock: Joi.number().integer(),
    priceRange: Joi.array()
      .items(Joi.number())
      .max(2),
    brandName: Joi.string()
      .min(2)
      .max(100)
      .required(),
    assets: Joi.object().keys({
      thumbnail_images: Joi.array().items(
        Joi.object().keys({
          height: Joi.number()
            .integer()
            .min(10)
            .max(100)
            .required(),
          width: Joi.number()
            .integer()
            .min(10)
            .max(100)
            .required(),
          title: Joi.string()
            .min(4)
            .max(100)
            .required(),
          src: Joi.string()
        })
      )
    }),
    discountAmount: Joi.number().integer(),
    discountPercentage: Joi.number().integer(),
    shortDetails: Joi.string()
      .min(2)
      .max(100)
    
  };
  return Joi.validate(product, schema);
}
module.exports = { Product, validateProduct };

//Testing purpose
// var p = {
//     name : "name",
//     lName: "lname",
//     category: "Category",
//     total_stock: 10,
//     priceRange: [10, 20],
//     brandName: "brandName",
//     assets: {
//         thumbnail_images: [{
//             height: 19,
//             width: 10,
//             title: "thumnailTitle",
//             src : "img src"
//         }]
//     },
//     discountAmount: 20,
//     discountPercentage: 30,
// }
// console.log(validateProduct(p))
