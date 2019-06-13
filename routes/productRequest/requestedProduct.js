const express=require("express");
const router=express.Router();
const {getAllRequestedProducts,addRequestedProduct,getRequestedProductsById,getRequestedProductsBybrandName,putRequestedProductsById,deleteRequestedProductsById} = require("../../controllers/productRequest/requestedProductController")

router.post("/",addRequestedProduct);
router.get("/", getAllRequestedProducts);
router.get("/productId/:productId",getRequestedProductsById);
router.get("/brand/:brandName",getRequestedProductsBybrandName);
router.put("/update/:productId",putRequestedProductsById);
router.delete("/delete/:productId",deleteRequestedProductsById);

module.exports=router;