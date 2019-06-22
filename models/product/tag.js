const Joi = require('joi');
const mongoose = require('mongoose');

const tagSchema = mongoose.Schema({
    value: {
        type: String,
        minlength: 2,
        maxlength: 50,
        required: true,
        trim: true,
        unique: true,
    }
},{
    timestamps: true
})

const Tag = mongoose.model("Tag", tagSchema) 

function validateTag(tag){
    const schema = {
        value: Joi.string().min(2).max(50).required()
    } 
    return Joi.validate(tag, schema, {abortEarly:false});  
} 
module.exports = {Tag, validateTag}; 



