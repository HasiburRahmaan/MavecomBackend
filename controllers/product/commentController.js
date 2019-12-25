const {
    ProductComment,
    validateProductComment,
    validateSingleComment,
    validateSingleReply
} = require("../../models/product/comment");
const { Customer } = require("../../models/customer/customer")

//Function
async function findById(id) {
    try {
        var productComment = await ProductComment.findById(id)
        return productComment ? productComment : null
    } catch (error) {
        return error
    }
}
//Generating Customer 
async function customerGenerator(customerId) {
    var customer = await Customer.findById(customerId);
    var customerSchema = {}
    customerSchema._id = customerId
    customerSchema.name = customer.fullName
    customerSchema.profilePicture = customer.images[0] ? customer.images[0] : "default link"//default link will be added
    return customerSchema
}

//Add Comment on existing products 
function addCommentOnExistingProduct(productComment, comment) {
    const { error } = validateSingleComment(comment)
    if (error) {
        return error
    } else {
        productComment.comments.push(comment)
        productComment.total_comments = productComment.comments.length
        // console.log(productComment)
        return productComment
    }
}
//Generating reply
async function replyGenerator(customerId, text) {

    var reply = {
        "active": true,
        "customer": await customerGenerator(customerId) ? await customerGenerator(customerId) : null,
        "comment": text
    }
    return reply
}


// Delete  single comment from a products
function deleteSingleCommentFromProduct(productComment, commentId) {
    productComment.comments = productComment.comments.filter(e => {
        return e.id != commentId
    })
    productComment.total_comments = productComment.comments.length
    return productComment
}

//Delete single reply from a comment
function deleteSingleReplyFromComment(comment, reply_id) {
    comment.replies = comment.replies.filter(e => {
        return e.id != reply_id
    })
    return comment
}

//check customer already reacted on the comment or not
function customerOnReactionList(comment, customerId) {
    var customerStatus = null
    var commentValue = comment.comment

    var likedLen = commentValue.likedBy.length
    var dislikedLen = commentValue.dislikedBy.length

    for (var i = 0; i < likedLen; i++) {
        if (commentValue.likedBy[i].id == customerId) {
            customerStatus = 1
            break
        }
    }
    for (var i = 0; i < dislikedLen; i++) {
        if (commentValue.dislikedBy[i].id == customerId) {
            customerStatus = 2
            break
        }
    }
    return customerStatus
}

//update single comment
async function updateComment(comment, text) {
    comment.text = text.length ? text : comment.text
    return comment
}

//update reaction list of a comment 
async function updateReactionListOfaComment(comment, customerId, reactionStatus) {
    var commentValue = comment.comment
    var customerStatus = await customerOnReactionList(comment, customerId)

    if (customerStatus == 1) {
        commentValue.likedBy = commentValue.likedBy.filter(e => {
            return e.id != customerId
        })
    } else if (customerStatus == 2) {
        commentValue.dislikedBy = commentValue.dislikedBy.filter(e => {
            return e.id != customerId
        })
    }
    else if (customerStatus == null) {
        var customerSchema = await customerGenerator(customerId)
        if (reactionStatus == 1) {
            commentValue.likedBy.push(customerSchema)
        } else if (reactionStatus == 2) {
            commentValue.dislikedBy.push(customerSchema)
        }
    }

    commentValue.liked = commentValue.likedBy.length
    commentValue.disLiked = commentValue.dislikedBy.length
    comment.comment = commentValue
    return comment
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
exports.addProductComment = async (req, res) => {
    const { error } = validateProductComment(req.body);
    if (error) {
        res.status(422).send(error.details.map(e => e.message));
    }
    var productComment = await findById(req.body.product.id)
    if (productComment) {
        var comment = req.body.comments[0]
        var updatedProductComment = addCommentOnExistingProduct(productComment, comment)
        await updatedProductComment.save()
        res.status(200).send(updatedProductComment)
    } else {
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
//Add Reply
exports.addReplyOnComment = async (req, res) => {
    var productCommentId = req.query.productComment_id
    var commentId = req.query.comment_id
    var customerId = req.query.customer_id
    var reply = req.body
    var productComment = await ProductComment.findById(productCommentId)

    if (productComment) {
        var comment = productComment.comments.filter(e => {
            return e.id == commentId
        })

        if (comment.length) {
            var reply = await replyGenerator(customerId, reply)
            const { error } = validateSingleReply(reply)
            if (error) {
                console.log(error)
                res.send(error.details.map(e => e.message))
            } else {
                comment[0].replies.push(reply)
                productComment.save()
                res.send(productComment)
            }
        } else {
            res.send("Comment has been removed")
        }
    } else {
        res.send("Product has been removed")
    }
}

//Get All ProductComment
exports.getAllProductComment = async (req, res) => {
    try {
        var comment = await ProductComment.find();
        console.log("comment")
        return res.send(comment);
    } catch (error) {
        res.status(404).send(error)
    }
}


//Get ProductComment By Id
exports.getProductCommentById = async (req, res) => {
    var id = req.params.id;
    try {
        var comment = await findById(id)
        return res.send(comment);
    } catch (error) {
        return res.status(404).send(error);
    }
}

//Update ProductComment
exports.updateProductComment = async (req, res) => {
    const { error } = validateProductComment(req.body);
    if (error) {
        res.status(400).send(error.details.map(e => e.message));
    }
    var id = req.params.id;
    try {
        var comment = await findById(id)
        if (comment) {
            comment.set(req.body);
            await comment.save();
            return res.send(comment);
        } else {
            return res.status(404).send("ProductComment not found with this id")
        }
    } catch (error) {
        return res.status(404).send(error);
    }

}

//Update single comment
exports.updateSingleComment = async (req, res) => {

    var productCommentId = req.query.productComment_id;
    var commentId = req.query.comment_id;
    var replyId = req.query.reply_id;
    var text = req.body.comment
    console.log(text)
    var productComment = await ProductComment.findById(productCommentId)

    if (productComment) {
        var comment = productComment.comments.filter(e => {
            return e.id == commentId
        })
        if (comment.length) {

            if (replyId) {
                console.log("reply")
                var reply = comment[0].replies.filter(e => {
                    return e.id == replyId
                })
                reply[0] = await updateComment(reply[0].comment, text)
            } else {
                comment[0] = await updateComment(comment[0].comment, text)
            }
            await productComment.save()
            res.send(productComment)
        } else {
            res.send("comment has been removed")
        }
    } else {
        res.send("product has been removed")
    }


}

//Update reaction list of a product
exports.updateReactionListOfaComment = async (req, res) => {
    var commentId = req.query.comment_id
    var customerId = req.query.customer_id
    var replyId = req.query.reply_id
    var reactionStatus = req.query.react
    try {
        var productComment = await findById(req.query.productcomment_id)
        var comment = productComment.comments.filter(e => {
            return e.id == commentId
        })
        if (replyId) {
            var reply = comment[0].replies.filter(e => {
                return e.id == replyId
            })
            reply = await updateReactionListOfaComment(reply[0], customerId, reactionStatus)
        } else {
            comment = await updateReactionListOfaComment(comment[0], customerId, reactionStatus)
        }
        await productComment.save()
        res.status(200).send(productComment)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}


//Delete ProductComment
exports.deleteProductComment = async (req, res) => {
    var id = req.params.id;
    try {
        var comment = await findById(id)
        if (comment) {
            comment.delete();
            return res.send(comment);
        } else {
            return res.status(404).send("ProductComment not found with this id")
        }
    } catch (error) {
        return res.status(404).send(error);
    }
}
//delete a single comment or reply
exports.deleteComment = async (req, res) => {
    var productCommentId = req.query.productComment_id;
    var commentId = req.query.comment_id
    var replyId = req.query.reply_id
    try {
        var productComment = await ProductComment.findById(productCommentId)
        if (replyId) {
            // console.log(productComment)
            var comment = productComment.comments.filter(e => {
                return e.id == commentId
            })
            comment = await deleteSingleReplyFromComment(comment[0], replyId)
        } else {
            productComment = await deleteSingleCommentFromProduct(productComment, commentId)
        }
        productComment.save()
        res.status(200).send(productComment)
    } catch (error) {
        console.log(error)
        res.status(404).send(error.details.map(e => e.message))
    }
}
