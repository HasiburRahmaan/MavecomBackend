const express=require("express");
const router=express.Router();
const {addUpdateRequestedProduct,getAllUpdateRequestedProducts,getUpdateRequestedProductById,getUpdateRequestedProductBybrandName,putUpdateRequestedProductById,deleteUpdateRequestedProductById} = require("../../controllers/productRequest/updateRequestedProductController")

router.post("/",addUpdateRequestedProduct);
router.get("/", getAllUpdateRequestedProducts);
router.get("/productId/:productId",getUpdateRequestedProductById);
router.get("/brand/:brandName",getUpdateRequestedProductBybrandName);
router.put("/update/:productId",putUpdateRequestedProductById);
router.delete("/delete/:productId",deleteUpdateRequestedProductById);

module.exports=router;