const {ProductDescription, validateProductDescription} = require("../../models/product/productDescription") 


//Function
async function findById(id){
    try{
        var productDescription =  await ProductDescription.findById(id);
        return productDescription
    }catch(error){
        return error
    }
}

//Create ProductDescription
exports.addProductDescription = async(req, res) =>{  
    const {error} =  validateProductDescription(req.body);
    if(error){
        res.status(400).send(error.details.map(e=>e.message));      
    }
    var productDescription = new ProductDescription(req.body);
    await productDescription.save();
    res.status(200).send(productDescription);    
} 

//Get all ProductDescription 
exports.getAllProductDescription = async(req, res)=>{
    try {
        var productDescriptions = await ProductDescription.find();
        return res.send(productDescriptions);
    } catch (error) {
        res.status(404).send(error)
    }
} 

//GetProductDescriptionById
exports.getProductDescriptionById = async(req, res)=>{
    var id = req.params.id;
    try {
        var productDescription =await findById(id)
        return res.send(productDescription); 
    } catch (error) {
        return res.status(404).send(error);
    } 
}

//Update ProductDescription
exports.updateProductDescription = async(req, res)=>{
    const {error} =  validateProductDescription(req.body);
    if(error){
        res.status(400).send(error.details.map(e=>e.message));      
    }
    var id = req.params.id;
    try {
        var productDescription =await findById(id)
        if(productDescription){
            productDescription.set(req.body);
            await productDescription.save();
            return res.send(productDescription); 
        }else{
            return res.status(404).send("ProductDescription not found with this id") 
        } 
    } catch (error) {
        return res.status(404).send(error);
    } 
} 

//Delete ProductDescription
exports.deleteProductDescription = async (req, res)=>{
    var id = req.params.id;
    try {
        var productDescription =await findById(id)
        if(productDescription){
            productDescription.delete();
            return res.send(productDescription); 
        }else{
            return res.status(404).send("ProductDescription not found with this id") 
        } 
    } catch (error) {
        return res.status(404).send(error);
    } 
}
