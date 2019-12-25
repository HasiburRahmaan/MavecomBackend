const express = require("express");
const router = express.Router();
const { addProductTag,
    getAllProductTag,
    getProductTagById,
    getProductListByTag,
    getTagListByProduct,
    updateProductTag,
    deleteProductTag } = require("../../controllers/product/productTagController");

const { staff } = require("../../middleware/authorization");
const { admin } = require("../../middleware/authorization");
const auth = require("../../middleware/auth");


//Post 
router.post('/post', addProductTag) //[auth, staff]

//Get
router.get('/', getAllProductTag);
//Get by id
router.get('/:id', getProductTagById);
//GetProductListByTagId
router.get('/tag/q', getProductListByTag);
//GetTagListByProductId
router.get('/product/q', getTagListByProduct)

//Put
router.put('/:id', updateProductTag);//[auth, staff]

//Delete
router.delete('/:id', deleteProductTag); //[auth, staff],

module.exports = router; 