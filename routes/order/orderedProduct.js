const express=require("express");
const router=express.Router();

const{getAllOrderedProduct,addOrderedProduct,getOrderedProductById,getOrderedProductByBrandName,putOrderedProductById,deleteOrderedProductById}=require("../../controllers/order/orderedProductController");

router.post("/",addOrderedProduct);
router.get("/",getAllOrderedProduct);
router.get("/product-id/:productId",getOrderedProductById);
router.get("/brand/:brandName",getOrderedProductByBrandName);
router.put("/update/:productId",putOrderedProductById);
router.delete("/delete/:productId",deleteOrderedProductById);

module.exports=router;
