const _ = require("lodash");
const bcrypt = require("bcrypt");
const {TopPreferableSeller,validationTopPreferableSeller} = require("../../models/customer/topPreferableSeller");
const {Customer} = require("../../models/customer/customer")

exports.addTopPreferableSeller = async (req,res)=>{

    const{error}=validationTopPreferableSeller(req.body);
    if(error)
        return res.status(400).send(error.details.map(e=>e.message));

    const topPreferableSeller=new TopPreferableSeller(req.body);
    topPreferableSeller.save();
    return res.status(200).send(req.body);
}

exports.getAllTopPreferableSeller = async (req,res)=>{

    const topPreferableSeller = await TopPreferableSeller.find();
    return res.status(200).send(topPreferableSeller);
}

exports.deleteTopPreferableSeller = async (req,res)=>{

    const topPreferableSeller = await TopPreferableSeller.findById(req.params.customerId);
    let result = null;
    if(topPreferableSeller){
        result = await topPreferableSeller.remove();
    }
    return res.send(result);

}

exports.updateTopPreferableSeller = async (req,res)=>{

    const{error}=validationTopPreferableSeller(req.body);
    if(error)
        return res.status(400).send(error.details.map(e=>e.message));

    const result = await TopPreferableSeller.findByIdAndUpdate(req.params.customerId,{
        $set:req.body
    });
    Customer.findOneAndUpdate({_id:req.body.customerId},{
        $set:{
            updatedAt:new Date()
        }
    })

    return res.status(200).send(result);
}