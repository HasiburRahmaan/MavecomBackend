const {Tag, validateTag} = require("../../models/product/tag") 


//Function
async function findById(id){
    try{
        var tag =  await Tag.findById(id);
        return tag
    }catch(error){
        return error
    }
}

//Create Tag
exports.addTag = async(req, res) =>{  
    const {error} =  validateTag(req.body);
    if(error){
        res.status(400).send(error.details.map(e=>e.message));      
    }
    var body = req.body;
    body.value = body.value.trim().toLowerCase()
    
    try {
        var tag = new Tag(body);
         await tag.save();
         res.status(200).send(tag); 
    } catch (error) {
        res.send(error)
    }

} 

//Get all Tag 
exports.getAllTag = async(req, res)=>{
    try {
        var tag = await Tag.find();
        return res.send(tag);
    } catch (error) {
        res.status(404).send(error)
    }
} 

//GetTagById
exports.getTagById = async(req, res)=>{
    var id = req.params.id;
    try {
        var tag =await findById(id)
        return res.send(tag); 
    } catch (error) {
        return res.status(404).send(error);
    } 
}

//Update Tag
exports.updateTag = async(req, res)=>{
    const {error} =  validateTag(req.body);
    if(error){
        res.status(400).send(error.details.map(e=>e.message));      
    }
    var id = req.params.id;
    try {
        var tag =await findById(id)
        if(tag){
            tag.set(req.body);
            await tag.save();
            return res.send(tag); 
        }else{
            return res.status(404).send("Tag not found with this id") 
        } 
    } catch (error) {
        return res.status(404).send(error);
    } 
} 

//Delete Tag
exports.deleteTag = async (req, res)=>{
    var id = req.params.id;
    try {
        var tag =await findById(id)
        if(tag){
            tag.delete();
            return res.send(tag); 
        }else{
            return res.status(404).send("Tag not found with this id") 
        } 
    } catch (error) {
        return res.status(404).send(error);
    } 
}
