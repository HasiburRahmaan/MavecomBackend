const _ = require("lodash");
const bcrypt = require("bcrypt");
const{validateOrder,Order}=require("../../models/order/order");
const {Product, validateProduct}=require("../../models/product/product");
const {DeliveryAddress,validationDeliveryAddress}=require("../../models/customer/deliveryAddress");
//post a order
exports.addOrder=async(request,response)=>{
    const{error}=validateOrder(request.body);
    if(error) 
    return response.status(400).send(error.details.map(e=>e.message));

    let user = await User.findOne({ username: req.body.userInfo.username });
    if (user) {
         let checkUserAddress=await DeliveryAddress.findById({customerId:req.params.user._id})
         if(checkUserAddress){
            let checkProductQuantity=await Product.findOne({total_stock:checkUserAddress.total_stock});
            
            if(checkProductQuantity<0){
                return res.status(400).send("Product quantity is zero");
            }else{
                
            }
         }else{
            return res.status(400).send("user address is empty");
         }
    } 
    
    const order=new Order(request.body);
    order.save();
    return response.status(200).send(request.body);
}

//GET ALL order
exports.getAllOrder = async (request,response)=>{
    try{
        const order=await Order.find();
        return response.status(200).send(order);
    }catch(err){
        response.status(404).send(err);
    }
}

//get a single order By id
exports.getOrderById= async(request,response)=>{
    try{
        const order=await Order.findById(request.params.productId);
        return response.send(order);
    }catch(err){
        return response.send(err);
    }
}

//GET A SINGLE order BY BRANDNAME

exports.getOrderByBrandName=async(request,response)=>{
    let brandName=request.params.brandName;
    try{
        const order=await Order.find({
           brandName:brandName
        });
        return response.status(200).send(order);
    }catch(err){
        return response.status(404).send(err);
    }
}

//UPDATE order BY ID

exports.putOrderById=async(request,response)=>{
    try{
       const order=await Order.findByIdAndUpdate(request.params.productId,{
           $set:request.body
       });
       return response.status(200).send(order)
    }catch(err){
        response.status(200).send(err)
    }
}

//Delete order BY ID

exports.deleteOrderById=async(request,response)=>{
    try{
        const order=await Order.findById(request.params.productId);
        let  result=null;
        if(order){
            result=await order.remove();
        }
        return response.send(result);
    }catch(error){
        response.status(404).send(error);
    }
}

