const _ = require("lodash");
const bcrypt = require("bcrypt");
const {CustomerTag,validationCustomertag} = require("../../models/customer/customerTag");
const {Customer} = require("../../models/customer/customer")

exports.addCustomerTag = async (req,res)=>{

    const{error}=validationCustomertag(req.body);
    if(error)
        return res.status(400).send(error.details.map(e=>e.message));

    const customerTag=new CustomerTag(req.body);
    customerTag.save();
    return res.status(200).send(req.body);
}

exports.getAllCustomerTag = async (req,res)=>{

    const customerTag = await CustomerTag.find();
    return res.status(200).send(customerTag);
}

exports.deleteCustomerTag = async (req,res)=>{

    const customerTag = await CustomerTag.findById(req.params.customerId);
    let result = null;
    if(customerTag){
        result = await customerTag.remove();
    }
    return res.send(result);

}

exports.updateCustomerTag = async (req,res)=>{

    const{error}=validationCustomertag(req.body);
    if(error)
        return res.status(400).send(error.details.map(e=>e.message));

    const result = await CustomerTag.findByIdAndUpdate(req.params.customerId,{
        $set:req.body
    });
    Customer.findOneAndUpdate({_id:req.body.customerId},{
        $set:{
            updatedAt:new Date()
        }
    })

    return res.status(200).send(result);
}