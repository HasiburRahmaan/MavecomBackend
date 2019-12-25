
const express = require("express");
const router = express.Router();

const { addDeliveryInfo, getAllDeliveryInfo, getAllDeliveryInforById } = require("../../controllers/order/deliveryInfoController");


router.post("/", addDeliveryInfo);
router.get("/", getAllDeliveryInfo);
router.get("/:id", getAllDeliveryInforById);



module.exports = router;