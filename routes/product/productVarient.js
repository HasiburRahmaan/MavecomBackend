const express = require("express");
const router = express.Router();
const {addProductVarient, getAllProductVarient, getProductVarientById, updateProductVarient, deleteProductVarient} = require("../../controllers/product/productVarientController"); 


const { staff } = require("../../middleware/authorization");
const { admin } = require("../../middleware/authorization");
const auth = require("../../middleware/auth");


//Post 
router.post('/', addProductVarient)

//Get
router.get('/',[auth, staff], getAllProductVarient);

router.get('/:id', getProductVarientById);

//Put
router.put('/:id',[auth, staff], updateProductVarient );

//Delete
router.delete('/:id',[auth, staff], deleteProductVarient); 

module.exports = router; 