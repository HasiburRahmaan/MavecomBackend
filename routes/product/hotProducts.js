const express = require("express");
const router = express.Router();
const {
    addHotProducts,  
    getAllHotProducts, 
    getHotProductById, 
    updateHotProducts, 
    deleteHotProducts
} = require("../../controllers/product/hotproductController")

const { staff } = require("../../middleware/authorization");
const { admin } = require("../../middleware/authorization");
const auth = require("../../middleware/auth");


//Post
router.post('/', [auth, staff], addHotProducts) 

//Get All HotProducts
router.get('/', getAllHotProducts)

//Get HotProduct by Id
router.get('/:id', getHotProductById)

//Put
router.put('/:id',[auth, staff], updateHotProducts);

//Delete
router.delete('/:id',[auth, staff], deleteHotProducts)

module.exports = router; 

