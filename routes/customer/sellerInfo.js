const express = require("express");
const router = express.Router();
const {
    addSellerInfo,
    getAllSellerInfo,
    getSellerInfoById,
    getSellerInfoByCustomerId,
    deleteSellerInfo,
    updateSellerInfo } = require("../../controllers/customer/sallerInfoController")

const { getAllOrderInfomationOfSellerBySellerId } = require("../../controllers/seller/sellerOrdersController")
const { staff } = require("../../middleware/authorization")
const { admin } = require("../../middleware/authorization")
const auth = require("../../middleware/auth")

router.post("/", addSellerInfo);

router.get("/", getAllSellerInfo);
router.get("/seller-id/:customerId", getSellerInfoById);
router.get("/customer-id/:customerId", getSellerInfoByCustomerId);

//Api of total sell of seller
router.get("/order_info/:seller_id", getAllOrderInfomationOfSellerBySellerId)

//.............//

router.delete("/delete-saller-info/:customerId", deleteSellerInfo);//[auth, staff],

router.put("/update-saller-info/:customerId", updateSellerInfo); //[auth, staff],

module.exports = router;