const {Brand, validateBrand} = require("../../models/product/brand") 


//Function
async function findById(id){
    try{
        var brand =  await Brand.findById(id);
        return brand
    }catch(error){
        return error
    }
} 

//Create Brand
exports.addBrand = async(req, res) =>{  
    const {error} =  validateBrand(req.body);
    if(error){
        res.status(400).send(error.details.map(e=>e.message));      
    }
    try {
        var brand = new Brand(req.body);
         await brand.save();
         res.status(200).send(brand); 
    } catch (error) {
        res.status(400).send(error); 
    }   
} 

//Get all Brand 
exports.getAllBrand = async(req, res)=>{
    try {
        var brands = await Brand.find();
        return res.send(brands);
    } catch (error) {
        res.status(404).send(error);
    }
} 

//GetBrandById
exports.getBrandById = async(req, res)=>{
    var id = req.params.id;
    try {
        var brand =await findById(id)
        return res.send(brand); 
    } catch (error) {
        return res.status(404).send(error);
    } 
}

//Update Brand
exports.updateBrand = async(req, res)=>{
    const {error} =  validateBrand(req.body);
    if(error){
        res.status(400).send(error.details.map(e=>e.message));      
    }
    var id = req.params.id;
    try {
        var brand =await findById(id)
        if(brand){
            brand.set(req.body);
            await brand.save();
            return res.send(brand); 
        }else{
            return res.status(404).send("Brand not found with this id") 
        } 
    } catch (error) {
        return res.status(404).send(error);
    } 
    
} 

//Delete Brand
exports.deleteBrand = async (req, res)=>{
    var id = req.params.id;
    try {
        var brand =await findById(id)
        if(brand){
            brand.delete();
            return res.send(brand); 
        }else{
            return res.status(404).send("Brand not found with this id") 
        } 
    } catch (error) {
        return res.status(404).send(error);
    } 
}