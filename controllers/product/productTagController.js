const {ProductTag, validateProductTag} = require("../../models/product/productTags") 


//Function
async function findById(id){
    try{
        var productTag =  await ProductTag.findById(id);
        return productTag
    }catch(error){
        return error
    }
}

//Create ProductTag
exports.addProductTag = async(req, res) =>{  
    const {error} =  validateProductTag(req.body);
    if(error){
        res.status(400).send(error.details.map(e=>e.message));      
    }
    var productTag = new ProductTag(req.body);
    await productTag.save();
    res.status(200).send(productTag);    
} 

//Get all ProductTag 
exports.getAllProductTag = async(req, res)=>{
    try {
        var productTag = await ProductTag.find();
        return res.send(productTag);
    } catch (error) {
        res.status(404).send(error)
    }
} 

//GetProductTagById
exports.getProductTagById = async(req, res)=>{
    var id = req.params.id;
    try {
        var productTag =await findById(id)
        return res.send(productTag); 
    } catch (error) {
        return res.status(404).send(error);
    } 
}

//Update ProductTag
exports.updateProductTag = async(req, res)=>{
    const {error} =  validateProductTag(req.body);
    if(error){
        res.status(400).send(error.details.map(e=>e.message));      
    }
    var id = req.params.id;
    try {
        var productTag =await findById(id)
        if(productTag){
            productTag.set(req.body);
            await productTag.save();
            return res.send(productTag); 
        }else{
            return res.status(404).send("ProductTag not found with this id") 
        } 
    } catch (error) {
        return res.status(404).send(error);
    } 
} 

//Delete ProductTag
exports.deleteProductTag = async (req, res)=>{
    var id = req.params.id;
    try {
        var productTag =await findById(id)
        if(productTag){
            productTag.delete();
            return res.send(productTag); 
        }else{
            return res.status(404).send("ProductTag not found with this id") 
        } 
    } catch (error) {
        return res.status(404).send(error);
    } 
}
