const express = require("express");
const router = express.Router();
const { addBrand, getAllBrand, getBrandById, getRecentProduct, updateBrand, deleteBrand } = require("../../controllers/product/brandController");

const { staff } = require("../../middleware/authorization");
const { admin } = require("../../middleware/authorization");
const auth = require("../../middleware/auth");


//Post 
router.post('/post', [auth, staff], addBrand)

//Get
router.get('/', [auth, staff], getAllBrand);

router.get('/:id', getBrandById);

//get recent product
router.get('/get-recent-product/q', getRecentProduct) 

//Put
router.put('/update/:id', [auth, staff], updateBrand);

//Delete
router.delete('/delete/:d', [auth, staff], deleteBrand);

module.exports = router; 