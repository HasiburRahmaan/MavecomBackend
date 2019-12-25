const express = require("express");
const router = express.Router();
const {
    addHotProducts,
    getAllHotProducts,
    getHotProductById,
    updateHotProducts,
    deleteHotProducts,
    getHotProductByBrandName
} = require("../../controllers/product/hotproductController")

const { staff } = require("../../middleware/authorization");
const { admin } = require("../../middleware/authorization");
const auth = require("../../middleware/auth");


//Post
router.post('/post', [auth, staff], addHotProducts)

//Get All HotProducts
router.get('/', getAllHotProducts)

//Get HotProduct by Id
router.get('/:id', getHotProductById)

//Get hotproduct by brandname
router.get('/brand/:brandname', getHotProductByBrandName);
//Put
router.put('/update/:id', [auth, staff], updateHotProducts);

//Delete
router.delete('/delete/:id', [auth, staff], deleteHotProducts)

module.exports = router;

