const mongoose = require("mongoose");
const Joi = require("joi");


const attributeSchema = mongoose.Schema({
    name:{
        type:String,
        minlength:2,
        maxlength:100,
        required:true,
        trim: true,
    },
    value:{
        type:String,
        minlength:2,
        maxlength:100,
        required:true,
        trim: true
    },
    // index: true,
    // unique: true 
},{
    timestamps: true 
});

attributeSchema.index({name: 1, value: 1},{unique: true})

const Attribute =mongoose.model("Attrs", attributeSchema); 

function validateAttribute(attribute){
    const schema = {
        name:Joi.string().min(2).max(100).required(),
        value:Joi.string().min(2).max(100).required(),
    }
    return Joi.validate(attribute, schema);
}

module.exports = {Attribute, validateAttribute}; 






//Testing Purpose
// var attrsDemo = {
//     name: "attrs",
//     value: "value"
// } 
// var attrsModel = new Attribute(attrsDemo)
// console.log(validateAttribute(attrsModel)); 










