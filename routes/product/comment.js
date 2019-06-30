const express = require("express");
const router = express.Router();
const {
    addProductComment, 
    getAllProductComment, 
    getProductCommentById, 
    updateProductComment, 
    updateReactionListOfaComment,
    deleteProductComment
} = require("../../controllers/product/commentController");

const { staff } = require("../../middleware/authorization");
const { admin } = require("../../middleware/authorization");
const auth = require("../../middleware/auth");


//Post
router.post('/',  addProductComment) //[auth, staff],

//Get
//Get All ProductComments
router.get('/',  getAllProductComment) //[auth, staff],

//Get Comment by Id
router.get('/:id', getProductCommentById)

//Put
router.put('/:id', updateProductComment);

router.put('/reaction/update', updateReactionListOfaComment);
//Demo url:  {{url}}/api/comment/reaction/update?productcomment_id=5cff730edbd4c6484f8f833f&comment_id=5d17460b8a25df6658f01756&customer_id=5d18985af25b1f362aa1b283&react=1

//Delete
router.delete('/:id', deleteProductComment)

module.exports = router; 

