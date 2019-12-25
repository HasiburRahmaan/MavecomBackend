const express = require("express");
const router = express.Router();
const { addOrderStatusInfo, getAllOrderStatusInfo, getOrderStatusInfoByCustomerId } = require("../../controllers/customer/orderStatusController")


router.post("/", addOrderStatusInfo);
router.get("/", getAllOrderStatusInfo);
router.get("/customer-id/:customerId", getOrderStatusInfoByCustomerId);

module.exports = router;