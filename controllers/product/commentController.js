const {ProductComment, validateProductComment, validateSingleComment} = require("../../models/product/comment");


//Function
async function findById(id){
    try{
        var productComment =  await ProductComment.findById(id)
        return productComment ? productComment : null 
    }catch(error){
        return error
    }
} 

//Add Comment on existing products 
function addCommentOnExistingProduct(productComment, comment){
    const {error} = validateSingleComment(comment) 
    if(error){
        return error
    }else{
        productComment.comments.push(comment) 
        productComment.total_comments = productComment.comments.length
        // console.log(productComment)
        return productComment
    }
}

//Delete a single comment from a products
// function deleteSingleCommentFromProduct(productComment, commentId){
//     // console.log(productComment.comments.length)
//     var updateProductComment = productComment
//     // updateProductComment.comments = productComment.comments.filter(e=>{
//     //      return e._id.toString() != commentId 
//     //     // console.log(e._id, commentId)
//     //  })  
//      console.log(updateProductComment)

// }

//Add
exports.addProductComment = async(req, res) =>{  
    const {error} =  validateProductComment(req.body);
    if(error){
        res.status(422).send(error.details.map(e=>e.message));      
    } 
    var productComment = await findById(req.body.product.id)
    if(productComment){
        var comment = req.body.comments[0] 
        var updatedProductComment =  addCommentOnExistingProduct(productComment, comment) 
        // console.log(updatedProductComment)
        await updatedProductComment.save()
        res.status(200).send(updatedProductComment)
    }else{
        try {
            var newProductComment = req.body; 
            newProductComment._id = newProductComment.product.id;
            newProductComment = new ProductComment(req.body);
            
            await newProductComment.save();   
            res.status(200).send(newProductComment);    
        } catch (error) {
            res.status(400).send(error) 
        }  
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
        // deleteSingleCommentFromProduct(comment, "5d174e7248f5047a2c9a960c")
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

//=========================

