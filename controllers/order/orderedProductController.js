const _ = require("lodash");
const {ProductVarient} = require('../../models/product/productVarient')
const{ValidateOrderedProduct,OrderProduct}=require("../../models/order/orderedProduct");

//Functions

// //Ordered product Generaton
async function orderedProductGenerator(productId, varientId, quantity){
    var product = await ProductVarient.findOne().where({productId})
    var varient = product.varients.filter(e=>{
        return e.id == varientId
    })
    varient = varient[0] 
    // var price = varient.price 
    // var discountAmount = varient.discountAmount.amount
    // var discountPercentage = varient.discountPercentage.amount 
    // var salesPrice  = varient.price-(((varient.discountPercentage.amount * varient.price)/100)+varient.discountAmount.amount)
    if(varient.quantity >= quantity){
        varient.quantity = varient.quantity-quantity 
        await product.save()
    }else{
        
    }
}

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
exports.addOrderedProduct=async(req,res)=>{
    const{error}=ValidateOrderedProduct(req.body);
    if(error) 
        return res.status(400).send(error.details.map(e=>e.message));
    
    await orderedProductGenerator(req.body.productId, req.body.productVariantId, req.body.quantity)
    const orderProduct=new OrderProduct(req.body);
    
    orderProduct.save();
    return res.status(200).send(req.body);
}

//get a single orderedProduct By id
exports.getOrderedProductById = async (request, response) => {
  try {
    const orderProduct = await OrderProduct.findById(request.params.productId);
    return response.send(orderProduct);
  } catch (err) {
    return response.send(err);
  }
};

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





