const {ProductComment, validateProductComment, validateSingleComment} = require("../../models/product/comment");


//Function
async function findById(id){
    try{
        var comment =  await ProductComment.findById(id);
        return comment
    }catch(error){
        return error
    }
} 

//Add
exports.addProductComment = async(req, res) =>{  
    const {error} =  validateProductComment(req.body);
    if(error){
        res.status(422).send(error.details.map(e=>e.message));      
    }
    try {
        var comment = new ProductComment(req.body);
         await comment.save();   
         res.status(200).send(comment);    
    } catch (error) {
        res.status(400).send(error)
    }  
} 


//Get All ProductComment
exports.getAllProductComment = async(req, res)=>{
    try {
        var comment = await ProductComment.find();
        return res.send(comment);
    } catch (error) {
        res.status(404).send(error)
    }
} 


//Get ProductComment By Id

exports.getProductCommentById = async(req, res)=>{
    var id = req.params.id;
    try {
        var comment =await findById(id)
        return res.send(comment); 
    } catch (error) {
        return res.status(404).send(error);
    } 
} 

//Update ProductComment
exports.updateProductComment = async(req, res)=>{
    const {error} =  validateProductComment(req.body);
    if(error){
        res.status(400).send(error.details.map(e=>e.message));      
    }
    var id = req.params.id;
    try {
        var comment =await findById(id)
        if(comment){
            comment.set(req.body);
            await comment.save();
            return res.send(comment); 
        }else{
            return res.status(404).send("ProductComment not found with this id") 
        } 
    } catch (error) {
        return res.status(404).send(error);
    } 
} 

//Update a single Comment 
// exports.updateSingleComment = async(req, res)=>{
//     const {error} = validateSingleComment(req.body);
//     if(error){
//         res.status(400).send(error.details.map(e=>e.message)); 
//     } 
//     var productCommentId = req.query.productcommentid; 
//     var commentId = req.query.commentid; 
    
//     var product = findById(productCommentId) 
//     var comments = product.comments()
// }

//Delete ProductComment
exports.deleteProductComment = async (req, res)=>{
    var id = req.params.id;
    try {
        var comment =await findById(id)
        if(comment){
            comment.delete();
            return res.send(comment); 
        }else{
            return res.status(404).send("ProductComment not found with this id") 
        } 
    } catch (error) {
        return res.status(404).send(error);
    } 
}