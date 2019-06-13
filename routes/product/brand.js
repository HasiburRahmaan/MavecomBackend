const express = require("express");
const router = express.Router();
const {addBrand, getAllBrand, getBrandById, updateBrand, deleteBrand} = require("../../controllers/product/brandController"); 

const { staff } = require("../../middleware/authorization");
const { admin } = require("../../middleware/authorization");
const auth = require("../../middleware/auth");


//Post 
router.post('/', addBrand) //[auth, staff],

//Get
router.get('/', getAllBrand); //[auth, staff],

router.get('/:id', getBrandById);

//Put
router.put('/:id', updateBrand ); //[auth, staff],

//Delete
router.delete('/:id',[auth, staff], deleteBrand); 

module.exports = router; 