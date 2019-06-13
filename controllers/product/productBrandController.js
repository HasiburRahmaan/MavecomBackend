const {ProductBrand, validateProductBrand} = require('../../models/product/productBrand'); 


//Function
async function findById(id){
    try{
        var productBrand =  await ProductBrand.findById(id);
        return productBrand
    }catch(error){
        return error
    }
}

//Create ProductBrand
exports.addProductBrand = async(req, res) =>{  
    const {error} =  validateProductBrand(req.body);
    if(error){
        res.status(400).send(error.details.map(e=>e.message));      
    }
    var productBrand = new ProductBrand(req.body);
    await productBrand.save();
    res.status(200).send(productBrand);    
} 

//Get all ProductBrand 
exports.getAllProductBrand = async(req, res)=>{
    try {
        var productBrands = await ProductBrand.find();
        return res.send(productBrands);
    } catch (error) {
        res.status(404).send(error)
    }
} 

//GetProductBrandById
exports.getProductBrandById = async(req, res)=>{
    var id = req.params.id;
    try {
        var productBrand =await findById(id)
        return res.send(productBrand); 
    } catch (error) {
        return res.status(404).send(error);
    } 
}

//Update ProductBrand
exports.updateProductBrand = async(req, res)=>{
    const {error} =  validateProductBrand(req.body);
    if(error){
        res.status(400).send(error.details.map(e=>e.message));      
    }
    var id = req.params.id;
    try {
        var productBrand =await findById(id)
        if(productBrand){
            productBrand.set(req.body);
            await productBrand.save();
            return res.send(productBrand); 
        }else{
            return res.status(404).send("ProductBrand not found with this id") 
        } 
    } catch (error) {
        return res.status(404).send(error);
    } 
} 

//Delete ProductBrand
exports.deleteProductBrand = async (req, res)=>{
    var id = req.params.id;
    try {
        var productBrand =await findById(id)
        if(productBrand){
            productBrand.delete();
            return res.send(ProductBrand); 
        }else{
            return res.status(404).send("ProductBrand not found with this id") 
        } 
    } catch (error) {
        return res.status(404).send(error);
    } 
}
