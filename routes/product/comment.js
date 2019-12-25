const express = require("express");
const router = express.Router();
const {
    addProductComment,
    addReplyOnComment, 
    getAllProductComment, 
    getProductCommentById, 
    updateProductComment, 
    updateSingleComment,
    updateReactionListOfaComment,
    deleteProductComment,
    deleteComment
} = require("../../controllers/product/commentController");

const { staff } = require("../../middleware/authorization");
const { admin } = require("../../middleware/authorization");
const auth = require("../../middleware/auth");


//Post
router.post('/',  addProductComment) //[auth, staff],
//add reply
router.post('/reply', addReplyOnComment)
//Demo url: {{url}}/api/comment/reply?productComment_id=5cff730edbd4c6484f8f833f&comment_id=5d17460b8a25df6658f01756&customer_id=5d18985af25b1f362aa1b283


//Get
//Get All ProductComments
router.get('/',  getAllProductComment)//[auth, staff],

//Get ProductComment by Id
router.get('/:id', getProductCommentById)

//Put
// router.put('/:id', updateProductComment);

//update single comment or reply
router.put('/update', updateSingleComment)
//parameter list: productComment_id, comment_id  for update a single comment
// add an extra parameter, reply_id if to update a reply 
//Demo url: {{url}}/api/comment/update?productComment_id=5cff730edbd4c6484f8f833f&comment_id=5d17460b8a25df6658f01756&reply_id=5d36fcb94c1c6b7bcbb3330e

//update user reaction 
router.put('/reaction/update', updateReactionListOfaComment);
//single api for update comment and reply reaction list 

//parameters: productcoment_id, comment_id, customer_id, react for only update comment reaction. 
//add reply_id parameter if want to update a reply's reaction 

//Demo url:  {{url}}/api/comment/reaction/update?productcomment_id=5cff730edbd4c6484f8f833f&comment_id=5d17460b8a25df6658f01756&customer_id=5d18985af25b1f362aa1b283&react=1&reply_id=
//react: 1=like, 2=dislike


router.put('/reaction/update', updateReactionListOfaComment);
//Demo url:  {{url}}/api/comment/reaction/update?productcomment_id=5cff730edbd4c6484f8f833f&comment_id=5d17460b8a25df6658f01756&customer_id=5d18985af25b1f362aa1b283&react=1

//Delete
router.delete('/:id', deleteProductComment)

//delete single comment
router.delete('/delete/comment', deleteComment) 
//single api for deleting comment and reply

//parameters: productComment_id, comment_id for only deleting comments
//add reply_id in parameter list for deleting reply

//Demo url for comment: {{url}}/api/comment/delete/comment?productComment_id=5cbf0ddd6c9f4d14846e2f2d&comment_id=5d1745d98a25df6658f01748
//Demo url for reply: {{url}}/api/comment/delete/comment?productComment_id=5cbf0ddd6c9f4d14846e2f2d&comment_id=5d1745d98a25df6658f01748&reply_id=5cbf0ddd6c9f4d14846e2f2d


module.exports = router; 

