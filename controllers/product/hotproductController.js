const {HotProducts, validateHotProducts} = require('../../models/product/hotProducts'); 


//Function
async function findById(id){
    try{
        var hotProducts =  await HotProducts.findById(id);
        return hotProducts
    }catch(error){
        return error
    }
}

//Create HotProducts
exports.addHotProducts = async(req, res) =>{  
    const {error} =  validateHotProducts(req.body);
    if(error){
        res.status(400).send(error.details.map(e=>e.message));      
    }
    var hotProducts = new HotProducts(req.body);
    await hotProducts.save();
    res.status(200).send(hotProducts);    
} 

//Get all HotProducts 
exports.getAllHotProducts = async(req, res)=>{
    try {
        var hotProductss = await HotProducts.find();
        return res.send(hotProductss);
    } catch (error) {
        res.status(404).send(error)
    }
} 

//GetHotProductsById
exports.getHotProductById = async(req, res)=>{
    var id = req.params.id;
    try {
        var hotProduct = await findById(id)
        return hotProduct?   res.send(hotProduct) : res.send("Product not found");  
    } catch (error) {
        return res.status(404).send(error);
    } 
}

//Update HotProducts
exports.updateHotProducts = async(req, res)=>{
    const {error} =  validateHotProducts(req.body);
    if(error){
        res.status(400).send(error.details.map(e=>e.message));      
    }
    var id = req.params.id;
    try {
        var hotProducts =await findById(id)
        if(hotProducts){
            hotProducts.set(req.body);
            await hotProducts.save();
            return res.send(hotProducts); 
        }else{
            return res.status(404).send("HotProducts not found with this id") 
        } 
    } catch (error) {
        return res.status(404).send(error);
    } 
} 

//Delete HotProducts
exports.deleteHotProducts = async (req, res)=>{
    var id = req.params.id;
    try {
        var hotProducts =await findById(id)
        if(hotProducts){
            hotProducts.delete();
            return res.send(hotProducts); 
        }else{
            return res.status(404).send("HotProducts not found with this id") 
        } 
    } catch (error) {
        return res.status(404).send(error);
    } 
}
