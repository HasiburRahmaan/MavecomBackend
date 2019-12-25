const express = require('express') 
const router = express.Router();

const {
     updateSimilarProduct,
    getAllSimilarProduct,
    getSimilarProductByProductId
} = require('../controller/recommendationBySimmlerProductController') 


router.get('/update', updateSimilarProduct) 

router.get('/all-products', getAllSimilarProduct)

router.get('/product/:id', getSimilarProductByProductId) 



module.exports = router


