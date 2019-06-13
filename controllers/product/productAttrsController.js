const {ProductAttrs, validateProductAttrs} = require('../../models/product/productAttrs'); 


//Function
async function findById(id){
    try{
        var productAttrs =  await ProductAttrs.findById(id);
        return productAttrs
    }catch(error){
        return error
    }
}

//Create ProductAttrs
exports.addProductAttrs = async(req, res) =>{  
    const {error} =  validateProductAttrs(req.body);
    if(error){
        res.status(400).send(error.details.map(e=>e.message));      
    }
    var productAttrs = new ProductAttrs(req.body);
    await productAttrs.save();
    res.status(200).send(productAttrs);    
} 

//Get all ProductAttrs 
exports.getAllProductAttrs = async(req, res)=>{
    try {
        var productAttrss = await ProductAttrs.find();
        return res.send(productAttrss);
    } catch (error) {
        res.status(404).send(error)
    }
} 

//GetProductAttrsById
exports.getProductAttrById = async(req, res)=>{
    var id = req.params.id;
    try {
        var productAttrs =await findById(id)
        return res.send(productAttrs); 
    } catch (error) {
        return res.status(404).send(error);
    } 
}

//Update ProductAttrs
exports.updateProductAttrs = async(req, res)=>{
    const {error} =  validateProductAttrs(req.body);
    if(error){
        res.status(400).send(error.details.map(e=>e.message));      
    }
    var id = req.params.id;
    try {
        var productAttrs =await findById(id)
        if(productAttrs){
            productAttrs.set(req.body);
            await productAttrs.save();
            return res.send(productAttrs); 
        }else{
            return res.status(404).send("ProductAttrs not found with this id") 
        } 
    } catch (error) {
        return res.status(404).send(error);
    } 
} 

//Delete ProductAttrs
exports.deleteProductAttrs = async (req, res)=>{
    var id = req.params.id;
    try {
        var productAttrs =await findById(id)
        if(productAttrs){
            productAttrs.delete();
            return res.send(productAttrs); 
        }else{
            return res.status(404).send("ProductAttrs not found with this id") 
        } 
    } catch (error) {
        return res.status(404).send(error);
    } 
}
