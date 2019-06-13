const Joi = require('joi');
const mongoose = require('mongoose');

const tagSchema = mongoose.Schema({
    value: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true
    }
})

const Tag = mongoose.model("Tag", tagSchema) 

function validateTag(tag){
    const schema = {
        value: Joi.string().min(3).max(50).required()
    } 
    return Joi.validate(tag, schema, {abortEarly:false});  
} 
module.exports = {Tag, validateTag}; 



