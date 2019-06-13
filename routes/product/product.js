const express = require("express");
const {addProduct, getProducts, getProductById,getProductByTopDiscount,getProductByBrandName, getProductByDeptName, updateProduct, deleteProduct} = require('../../controllers/product/productController'); 
const router = express.Router(); 

const { staff } = require("../../middleware/authorization");
const { admin } = require("../../middleware/authorization");
const auth = require("../../middleware/auth");


//Post Product
router.post('/', addProduct) 

//Get All Products
router.get('/', getProducts)

//Get Product by Id
router.get('/productid/:id', getProductById)

//Get Product by department name
router.get('/products/department/:deptname', getProductByDeptName) 

//Get Product by Brand Name
router.get('/products/brand', getProductByBrandName);

//Get Product by Top Discount
router.get('/top-discounts', getProductByTopDiscount);


//Put Request
router.put('/:id',[auth, staff], updateProduct);



//Delete Request
router.delete('/:id',[auth, staff], deleteProduct)


module.exports = router; 