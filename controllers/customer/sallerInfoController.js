const _ = require("lodash");
const bcrypt = require("bcrypt");
const {SallerInfo,validationSallerInfo} = require("../../models/customer/sallerInfo");
const {Customer} = require("../../models/customer/customer")

exports.addSallerInfo = async (req,res)=>{

    const{error}=validationSallerInfo(req.body);
    if(error)
        return res.status(400).send(error.details.map(e=>e.message));

    const sallerInfo=new SallerInfo(req.body);
    sallerInfo.save();
    return res.status(200).send(req.body);
}

exports.getAllSallerInfo = async (req,res)=>{

    const sallerInfo = await SallerInfo.find();
    return res.status(200).send(sallerInfo);
}

exports.deleteSallerInfo = async (req,res)=>{

    const sallerInfo = await SallerInfo.findById(req.params.customerId);
    let result = null;
    if(sallerInfo){
        result = await sallerInfo.remove();
    }
    return res.send(result);

}

exports.updateSallerInfo = async (req,res)=>{

    const{error}=validationSallerInfo(req.body);
    if(error)
        return res.status(400).send(error.details.map(e=>e.message));

    const result = await SallerInfo.findByIdAndUpdate(req.params.customerId,{
        $set:req.body
    });
    Customer.findOneAndUpdate({_id:req.body.customerId},{
        $set:{
            updatedAt:new Date()
        }
    })

    return res.status(200).send(result);
}