const _ = require("lodash");
const bcrypt = require("bcrypt");
const {User} = require("../../models/user/user");
const {DeliveryAddress,validationDeliveryAddress} = require("../../models/customer/deliveryAddress");

const {Customer} = require("../../models/customer/customer")


exports.addDeliveryAddress = async (req,res)=>{

    const{error}=validationDeliveryAddress(req.body);
    if(error)
        return res.status(400).send(error.details.map(e=>e.message));

    const deliveryAddress=new DeliveryAddress(req.body);
    deliveryAddress.save();
    return res.status(200).send(req.body);

}

exports.getAllDeliveryAddress = async (req,res)=>{

    const deliveryAddress = await DeliveryAddress.find();
    return res.status(200).send(deliveryAddress);

} 



exports.deleteDeliveryAddress = async (req,res)=>{

    const deliveryAddress = await DeliveryAddress.findById(req.params.customerId);
    let result = null;
    if(deliveryAddress){
        result = await deliveryAddress.remove();
    }
    return res.send(result);

}

exports.updateDeliveryAddress = async (req,res)=>{

    const{error}=validationDeliveryAddress(req.body);
    if(error)
        return res.status(400).send(error.details.map(e=>e.message));
    const result = await DeliveryAddress.findByIdAndUpdate(req.params.customerId,{
        $set:req.body
    });
    Customer.findOneAndUpdate({_id:req.body.customerId},{
        $set:{
            updatedAt:new Date()
        }
    })

    return res.status(200).send(result);

}