const express = require("express");
const router = express.Router();
const {addProductComment, getAllProductComment, getProductCommentById, updateProductComment, deleteProductComment} = require("../../controllers/product/commentController");

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

//Delete
router.delete('/:id', deleteProductComment)

module.exports = router; 

