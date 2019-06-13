const express = require("express");
const router = express.Router();
const {addProductTag, getAllProductTag, getProductTagById, updateProductTag, deleteProductTag} = require("../../controllers/product/productTagController"); 

const { staff } = require("../../middleware/authorization");
const { admin } = require("../../middleware/authorization");
const auth = require("../../middleware/auth");


//Post 
router.post('/',[auth, staff], addProductTag)

//Get
router.get('/', getAllProductTag);

router.get('/:id', getProductTagById);

//Put
router.put('/:id',[auth, staff], updateProductTag );

//Delete
router.delete('/:id',[auth, staff], deleteProductTag); 

module.exports = router; 