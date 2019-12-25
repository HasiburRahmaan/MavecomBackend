const express=require("express");
const router=express.Router();
const {getAllRequestedProducts,addRequestedProduct,getRequestedProductsById,getRequestedProductsBybrandName,putRequestedProductsById,deleteRequestedProductsById} = require("../../controllers/productRequest/requestedProductController")

const { staff } = require('../../middleware/authorization');
const auth = require('../../middleware/auth');

router.post("/",addRequestedProduct);
router.get("/", [auth, staff], getAllRequestedProducts);
router.get("/productId/:productId", [auth, staff],getRequestedProductsById);
router.get("/brand/:brandName", [auth, staff],getRequestedProductsBybrandName);
router.put("/update/:productId", [auth, staff],putRequestedProductsById);
router.delete("/delete/:productId", [auth, staff],deleteRequestedProductsById);

module.exports=router;