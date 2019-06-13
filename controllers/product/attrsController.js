const {Attribute, validateAttribute} = require('../../models/product/attrs'); 


//Function
async function findById(id){
    try{
        var attribute =  await Attribute.findById(id);
        return attribute
    }catch(error){
        return error
    }
}

//Create Attribute
exports.addAttrs = async(req, res) =>{  
    const {error} =  validateAttribute(req.body);
    if(error){
        res.status(400).send(error.details.map(e=>e.message));      
    }
    try {
        var attribute = new Attribute(req.body);
         await attribute.save();
         res.status(200).send(attribute); 
    } catch (error) {
        res.status(400).send(error); 
    }   
} 

//Get all Attribute 
exports.getAllAttrs = async(req, res)=>{
    try {
        var attributes = await Attribute.find();
        return res.send(attributes);
    } catch (error) {
        res.status(404).send(error)
    }
} 

//GetAttributeById
exports.getAttrById = async(req, res)=>{
    var id = req.params.id;
    try {
        var attribute =await findById(id)
        return attribute ? res.send(attribute) : res.send("Atrribute not found")  
        
    } catch (error) {
        return res.status(404).send(error);
    } 
}

//Update Attribute
exports.updateAttrs = async(req, res)=>{
    const {error} =  validateAttribute(req.body);
    if(error){
        res.status(400).send(error.details.map(e=>e.message));      
    }
    var id = req.params.id;
    try {
        var attribute =await findById(id)
        if(attribute){
            attribute.set(req.body);
            await attribute.save();
            return res.send(attribute); 
        }else{
            return res.status(404).send("Attribute not found with this id") 
        } 
    } catch (error) {
        return res.status(404).send(error);
    } 
} 

//Delete Attribute
exports.deleteAttrs = async (req, res)=>{
    var id = req.params.id;
    try {
        var attribute =await findById(id)
        if(attribute){
            attribute.delete();
            return res.send(attribute); 
        }else{
            return res.status(404).send("Attribute not found with this id") 
        } 
    } catch (error) {
        return res.status(404).send(error);
    } 
}
