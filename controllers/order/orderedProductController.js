const _ = require("lodash");
const bcrypt = require("bcrypt");

const{ValidateOrderedProduct,OrderProduct}=require("../../models/order/orderedProduct");

//GET ALL orderedProduct
exports.getAllOrderedProduct = async (request,response)=>{
    try{
        const orderProduct=await OrderProduct.find();
        return response.status(200).send(orderProduct);

    }catch(err){
        response.status(404).send(err);
    }
}
//post a orderedProduct
exports.addOrderedProduct=async(request,response)=>{
    const{error}=ValidateOrderedProduct(request.body);
    if(error) 
        return response.status(400).send(error.details.map(e=>e.message));
    const orderProduct=new OrderProduct(request.body);
    orderProduct.save();
    return response.status(200).send(request.body);
}

//get a single orderedProduct By id
exports.getOrderedProductById= async(request,response)=>{
    try{
        const orderProduct=await OrderProduct.findById(request.params.productId);
        return response.send(orderProduct);
    }catch(err){
        return response.send(err);
    }
}

//GET A SINGLE orderedProduct BY BRANDNAME

exports.getOrderedProductByBrandName=async(request,response)=>{
    let brandName=request.params.brandName;
    try{
        const orderProduct=await OrderProduct.find({
           brandName:brandName
        });
        return response.status(200).send(orderProduct);
    }catch(err){
        return response.status(404).send(err);
    }
}

//UPDATE orderedProduct BY ID

exports.putOrderedProductById=async(request,response)=>{
    try{
       const orderProduct=await OrderProduct.findByIdAndUpdate(request.params.productId,{
           $set:request.body
       });
       return response.status(200).send(orderProduct)
    }catch(err){
        response.status(200).send(err)
    }
}

//Delete orderedProduct BY ID

exports.deleteOrderedProductById=async(request,response)=>{
    try{
        const orderProduct=await OrderProduct.findById(request.params.productId);
        let  result=null;
        if(OrderProduct){
            result=await orderProduct.remove();
        }
        return response.send(result);
    }catch(error){
        response.status(404).send(error);
    }
}