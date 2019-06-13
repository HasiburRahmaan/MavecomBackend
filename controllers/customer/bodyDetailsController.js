const _ = require("lodash");
const bcrypt = require("bcrypt");
const {BodyDetails,validationBodyDetails} = require("../../models/customer/bodyDetails");
const {Customer} = require("../../models/customer/customer")

exports.addBodyDetails = async (req,res)=>{

    const{error}=validationBodyDetails(req.body);
    if(error)
        return res.status(422).send(error.details.map(e=>e.message));

    const bodyDetails=new BodyDetails(req.body);
    bodyDetails.save();
    return res.status(200).send(bodyDetails);
}

exports.getAllBodyDetails = async (req,res)=>{

    const bodyDetailses = await BodyDetails.find();
    return res.status(200).send(bodyDetailses);
}

exports.getBodyDetailsById = async (req, res)=>{
    const bodyDetails = await BodyDetails.findById(req.params.id);

    return bodyDetails ? res.status(200).send(bodyDetails) : res.status(404).send("not found") 
}

exports.deleteBodyDetails = async (req,res)=>{

    const bodyDetails = await BodyDetails.findById(req.params.customerId);
    let result = null;
    if(bodyDetails){
        result = await bodyDetails.remove();
    }
    return res.send(result);

}

exports.updateBodyDetails = async (req,res)=>{

    const{error}=validationBodyDetails(req.body);
    if(error)
        return res.status(422).send(error.details.map(e=>e.message));

    const result = await BodyDetails.findByIdAndUpdate(req.params.customerId,{
        $set:req.body
    });
    Customer.findOneAndUpdate({_id:req.body.customerId},{
        $set:{
            updatedAt:new Date()
        }
    })

    return res.status(200).send(result);
}