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
    try {
        if(await HotProducts.findOne().where({productId:req.body.productId})){
            return res.status(409).send("Product already in hotproduct list")
        }
        var hotProducts = new HotProducts(req.body);
        hotProducts._id = req.body.productId
        await hotProducts.save();
        res.status(200).send(hotProducts);   
    } catch (error) {
        res.status(404).send(error)
    } 
} 

//Get all HotProducts 
exports.getAllHotProducts = async(req, res)=>{
    try {
        var hotProductss = await HotProducts.find();
    //    var hotProductss = await HotProducts.find().populate({path:"productId" ,select:"brandName _id "});
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

//gethotProductBybrandname
exports.getHotProductByBrandName = async (req, res) => {
    try {
        var  brandName=req.params.brandname.trim();
        var hotProducts = await HotProducts.find().populate({path:"productId"});
        var result = hotProducts.filter(e=>{  
            if(e.productId && e.productId.brandName != null)
                return e.productId.brandName.toString() == brandName
        }) 
        return res.status(200).send(result) 
    } catch (error) { 
        return res.status(404).send(error.message); 
    }
}; 
 
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
        console.log(hotProducts)    
        if(hotProducts){
            hotProducts.delete();
            return res.send(hotProducts); 
        }else{
            return res.status(404).send("HotProducts not found with this id") 
        } 
    } catch (error) {
        console.log(error)  
        return res.status(404).send(error);
    } 
}
