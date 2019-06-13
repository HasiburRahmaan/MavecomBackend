const {Shipping, validateShipping} = require("../../models/product/shipping") 


//Function
async function findById(id){
    try{
        var shipping =  await Shipping.findById(id);
        return shipping
    }catch(error){
        return error
    }
}

//Create Shipping
exports.addShipping = async(req, res) =>{  
    const {error} =  validateShipping(req.body);
    if(error){
        res.status(400).send(error.details.map(e=>e.message));      
    }
    var shipping = new Shipping(req.body);
    await shipping.save();
    res.status(200).send(shipping);    
} 

//Get all Shipping 
exports.getAllShipping = async(req, res)=>{
    try {
        var shipping = await Shipping.find();
        return res.send(shipping);
    } catch (error) {
        res.status(404).send(error);
    }
} 

//GetShippingById
exports.getShippingById = async(req, res)=>{
    var id = req.params.id;
    try {
        var shipping =await findById(id)
        return res.send(shipping); 
    } catch (error) {
        return res.status(404).send(error);
    } 
}

//Update Shipping
exports.updateShipping = async(req, res)=>{
    const {error} =  validateShipping(req.body);
    if(error){
        res.status(400).send(error.details.map(e=>e.message));      
    }
    var id = req.params.id;
    try {
        var shipping =await findById(id)
        if(shipping){
            shipping.set(req.body);
            await shipping.save();
            return res.send(shipping); 
        }else{
            return res.status(404).send("Shipping not found with this id") 
        } 
    } catch (error) {
        return res.status(404).send(error);
    } 
} 

//Delete Shipping
exports.deleteShipping = async (req, res)=>{
    var id = req.params.id;
    try {
        var shipping =await findById(id)
        if(shipping){
            shipping.delete();
            return res.send(shipping); 
        }else{
            return res.status(404).send("Shipping not found with this id") 
        } 
    } catch (error) {
        return res.status(404).send(error);
    } 
}
