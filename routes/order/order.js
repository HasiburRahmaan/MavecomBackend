
const express=require("express");
const router=express.Router();

const{addOrder,getAllOrder,getOrderById,getOrderByBrandName,putOrderById,deleteOrderById}=require("../../controllers/order/orderController");

router.post("/",addOrder);
router.get("/",getAllOrder);
router.get("/product-id/:productId",getOrderById);
router.get("/brand/:brandName",getOrderByBrandName);
router.put("/update/:productId",putOrderById);
router.delete("/delete/:productId",deleteOrderById);

module.exports=router;