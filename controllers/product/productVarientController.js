const {ProductVarient, validateProductVarient} = require("../../models/product/productVarient") 


//Function
async function findById(id){
    try{
        var productVarient =  await ProductVarient.findById(id);
        return productVarient
    }catch(error){
        return error
    }
}

//Create ProductVarient
exports.addProductVarient = async(req, res) =>{  
    const {error} =  validateProductVarient(req.body);
    if(error){
        res.status(400).send(error.details.map(e=>e.message));      
    }
    var productVarient = new ProductVarient(req.body);
    await productVarient.save();
    res.status(200).send(productVarient);    
} 

//Get all ProductVarient 
exports.getAllProductVarient = async(req, res)=>{
    try {
        var productVarient = await ProductVarient.find();
        return res.send(productVarient);
    } catch (error) {
        res.status(404).send(error)
    }
} 

//GetProductVarientById
exports.getProductVarientById = async(req, res)=>{
    var id = req.params.id;
    try {
        var productVarient =await findById(id)
        return res.send(productVarient); 
    } catch (error) {
        return res.status(404).send(error);
    } 
}

//Update ProductVarient
exports.updateProductVarient = async(req, res)=>{
    const {error} =  validateProductVarient(req.body);
    if(error){
        res.status(400).send(error.details.map(e=>e.message));      
    }
    var id = req.params.id;
    try {
        var productVarient =await findById(id)
        if(productVarient){
            productVarient.set(req.body);
            await productVarient.save();
            return res.send(productVarient); 
        }else{
            return res.status(404).send("ProductVarient not found with this id") 
        } 
    } catch (error) {
        return res.status(404).send(error);
    } 
} 

//Delete ProductVarient
exports.deleteProductVarient = async (req, res)=>{
    var id = req.params.id;
    try {
        var productVarient =await findById(id)
        if(productVarient){
            productVarient.delete();
            return res.send(productVarient); 
        }else{
            return res.status(404).send("ProductVarient not found with this id") 
        } 
    } catch (error) {
        return res.status(404).send(error);
    } 
}
