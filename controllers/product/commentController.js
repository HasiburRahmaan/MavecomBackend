const {ProductComment, validateProductComment, validateSingleComment} = require("../../models/product/comment");
const {Customer } = require("../../models/customer/customer")

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

// Delete a single comment from a products
function deleteSingleCommentFromProduct(productComment, commentId){
    productComment.comments = productComment.comments.filter(e=>{
        return e.id != commentId
    })
    productComment.total_comments = productComment.comments.length
    return productComment
}

//check customer already reacted the comment or not
function customerOnReactionList(comment, customerId){
    var customerStatus = null
    var commentValue = comment.comment 
    
    var likedLen = commentValue.likedBy.length 
    var dislikedLen = commentValue.dislikedBy.length

    for(var i = 0; i<likedLen; i++){ 
        if(commentValue.likedBy[i].id == customerId){
            customerStatus = 1 
            break 
        }
    } 
    for(var i = 0; i<dislikedLen; i++){
        if(commentValue.dislikedBy[i].id == customerId){
            customerStatus = 2
            break 
        }
    } 
    return customerStatus
}


//update reaction list of a comment 
async function updateReactionListOfaComment(comment, customerId, reactionStatus){
    var customer = await Customer.findById(customerId) 
    var commentValue = comment.comment
    var customerStatus = customerOnReactionList(comment, customerId) 
    
    if(customerStatus==1){
        commentValue.likedBy = commentValue.likedBy.filter(e=>{
            return e.id != customerId
        })
    }else if(customerStatus == 2){
        commentValue.dislikedBy = commentValue.dislikedBy.filter(e=>{
            return e.id != customerId
        })
    }
    else if(customerStatus == null){
        var customerSchema = {}; 
        customerSchema._id = customerId 
        customerSchema.name = customer.fullName
        customerSchema.profilePicture = customer.assets.images[0] 
    
        if(reactionStatus==1){
            commentValue.likedBy.push(customerSchema) 
        } else if(reactionStatus == 2){
            commentValue.dislikedBy.push(customerSchema)
            
        }    
    }

    commentValue.liked = commentValue.likedBy.length
    commentValue.disLiked = commentValue.dislikedBy.length
    comment.comment = commentValue
    return comment
}


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

//Update reaction list of a product
exports.updateReactionListOfaComment = async (req, res)=>{    
    var commentId =  req.query.comment_id
    var customerId = req.query.customer_id 
    var reactionStatus = req.query.react 

    try {
        var productComment = await findById(req.query.productcomment_id) 
        var commentIndex = 0
        var len = productComment.comments.length
        var comment = productComment.comments.filter(e=>{
            return e.id == commentId 
        }) 
        // for(commentIndex=0; commentIndex<len; commentIndex++){
        //     if(productComment.comments[commentIndex].id == commentId){ 
        //         comment = productComment.comments[commentIndex]
        //         break
        //     }
        // }
        comment = await updateReactionListOfaComment(comment[0], customerId, reactionStatus) 
        // productComment.comments[commentIndex] =  comment  
        await productComment.save()
        res.status(200).send(productComment) 
    } catch (error) {
        console.log(error)
        res.send(error)
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

