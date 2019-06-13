const express=require("express");
const router=express.Router();

const{getAllOrderShipping,addOrderShipping,getOrderShippingById,getOrderShippingByBrandName,putOrderShippingById,deleteOrderShippingById}=require("../../controllers/order/orderShippingController");

router.post("/",addOrderShipping);
router.get("/",getAllOrderShipping);
router.get("/product-id/:productId",getOrderShippingById);
router.get("/brand/:brandName",getOrderShippingByBrandName);
router.put("/update/:productId",putOrderShippingById);
router.delete("/delete/:productId",deleteOrderShippingById);


module.exports=router;