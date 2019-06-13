const _ = require("lodash");
const bcrypt = require("bcrypt");
const {CustomerSearchKeywords,validateCustomerSearchKeywords} = require("../../models/customer/customerSearchKeywords");
const {Customer} = require("../../models/customer/customer")

exports.addCustomerSearchKeywords = async (req,res)=>{

    const{error}=validateCustomerSearchKeywords(req.body);
    if(error)
        return res.status(400).send(error.details.map(e=>e.message));

    const customerSearchKeywords = new CustomerSearchKeywords(req.body);
    customerSearchKeywords.save();
    return res.status(200).send(req.body);
}

exports.getAllCustomerSearchKeywords = async (req,res)=>{

    const customerSearchKeywords = await CustomerSearchKeywords.find();
    return res.status(200).send(customerSearchKeywords);
}

exports.deleteCustomerSearchKeywords = async (req,res)=>{

    const customerSearchKeywords = await CustomerSearchKeywords.findById(req.params.customerId);
    let result = null;
    if(customerSearchKeywords){
        result = await customerSearchKeywords.remove();
    }
    return res.send(result);

}

exports.updateCustomerSearchKeywords = async (req,res)=>{

    const{error}=validateCustomerSearchKeywords(req.body);
    if(error)
        return res.status(400).send(error.details.map(e=>e.message));

    const result = await CustomerSearchKeywords.findByIdAndUpdate(req.params.customerId,{
        $set:req.body
    });
    Customer.findOneAndUpdate({_id:req.body.customerId},{
        $set:{
            updatedAt:new Date()
        }
    })

    return res.status(200).send(result);
}