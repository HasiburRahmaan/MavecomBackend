const mongoose = require('mongoose');
const Joi = require('joi');


const imageSchema = mongoose.Schema({
    src: {
        type: String,
        minlength: 1,
        required: true
        //Other fields will be decided 
    }
})

const brandSchema = mongoose.Schema({
    image: {
        type: imageSchema,
        required: true
    },
    name: {
        type: String,
        minlength: 2,
        required: true,
        trim: true,
        // max, min and other validators will be decided
    }
},{
    timestamps: true
})

const Brand = mongoose.model("Brand", brandSchema);

function validateBrand(brand) {
    const schema = {
        image: Joi.object().keys({
            src: Joi.string().min(1).required()
        }),
        name: Joi.string().required().min(2)
    }

    return Joi.validate(brand, schema);

}

module.exports = {Brand, validateBrand}


//Testing purpose
// ==========================
// const testModel = {
//     image : {
//         src : "img-srcasdfasdfasdfasdfasdfsdfa"
//     },
//     name: "name"
// }  

// const brand = new Brand(testModel);
// console.log( validateBrand(testModel) )








