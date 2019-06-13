const express = require("express");
const router = express.Router();
const {addProductAttrs,  getAllProductAttrs, getProductAttrById, updateProductAttrs, deleteProductAttrs} = require("../../controllers/product/productAttrsController")

const { staff } = require("../../middleware/authorization");
const { admin } = require("../../middleware/authorization");
const auth = require("../../middleware/auth");


//Post
router.post('/',[auth, staff], addProductAttrs) 

//Get All ProductAttributes
router.get('/', getAllProductAttrs)

//Get ProductAttribute by Id
router.get('/:id', getProductAttrById)

//Put
router.put('/:id',[auth, staff], updateProductAttrs);

//Delete
router.delete('/:id',[auth, staff], deleteProductAttrs)

module.exports = router; 

