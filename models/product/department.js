const Joi = require('joi');
const mongoose = require('mongoose');

const departmentSchema = mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true,
        trim: true, 
    }
}, {
    timestamps: true 
})

const Department = mongoose.model("Department", departmentSchema) 

function validateDepartment(department){
    const schema = {
        name: Joi.string().min(3).max(50).required()
    } 
    return Joi.validate(department, schema, {abortEarly:false});  
} 
module.exports = {Department, validateDepartment}; 



//Testing Purpose
// var departmentDemo = {
//     name: "Department" 
// } 
// console.log(validateDepartment(departmentDemo)) 
