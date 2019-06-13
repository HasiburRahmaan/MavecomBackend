const _ = require("lodash");
const bcrypt = require("bcrypt");

const{ ValidateOrderShipping,OrderShipping}=require("../../models/order/orderShipping");

//GET ALL orderShipping
exports.getAllOrderShipping = async (request,response)=>{
    try{
        const orderShipping=await OrderShipping.find();
        return response.status(200).send(orderShipping);

    }catch(err){
        response.status(404).send(err);
    }
}
//post a orderShipping
exports.addOrderShipping=async (request,response)=>{
    const{error}=ValidateOrderShipping(request.body);
    if(error) 
        return response.status(400).send(error.details.map(e=>e.message));
    const orderShipping=new OrderShipping(request.body);
    orderShipping.save();
    return response.status(200).send(request.body);
}

//get a single orderShipping By id
exports.getOrderShippingById= async(request,response)=>{
    try{
        const orderShipping=await OrderShipping.findById(request.params.productId);
        return response.send(orderShipping);
    }catch(err){
        return response.send(err);
    }
}

//GET A SINGLE orderShipping BY BRANDNAME

exports.getOrderShippingByBrandName=async(request,response)=>{
    let brandName=request.params.brandName;
    try{
        const orderShipping=await OrderShipping.find({
           brandName:brandName
        });
        return response.status(200).send(orderShipping);
    }catch(err){
        return response.status(404).send(err);
    }
}

//UPDATE orderedProduct BY ID

exports.putOrderShippingById=async(request,response)=>{
    try{
       const orderShipping=await OrderShipping.findByIdAndUpdate(request.params.productId,{
           $set:request.body
       });
       return response.status(200).send(orderShipping)
    }catch(err){
        response.status(200).send(err)
    }
}

//Delete orderedProduct BY ID

exports.deleteOrderShippingById=async(request,response)=>{
    try{
        const orderShipping=await OrderShipping.findById(request.params.productId);
        let  result=null;
        if(OrderShipping){
            result=await orderShipping.remove();
        }
        return response.send(result);
    }catch(error){
        response.status(404).send(error);
    }
}