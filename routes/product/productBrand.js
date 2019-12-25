const express = require("express");
const router = express.Router();
const { addProductBrand, getAllProductBrand, getProductBrandById, updateProductBrand, deleteProductBrand } = require("../../controllers/product/productBrandController")

const { staff } = require("../../middleware/authorization");
const { admin } = require("../../middleware/authorization");
const auth = require("../../middleware/auth");


//Post
router.post('/post', [auth, staff], addProductBrand)

//Get All ProductBrand
router.get('/', [auth, staff], getAllProductBrand)

//Get ProductBrand by Id
router.get('/:id', [auth, staff], getProductBrandById)

//Put
router.put('/update/:id', [auth, staff], updateProductBrand);

//Delete
router.delete('/delete/:id', [auth, staff], deleteProductBrand)

module.exports = router;

