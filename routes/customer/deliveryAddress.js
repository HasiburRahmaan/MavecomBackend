const express = require("express");
const router = express.Router();
const { addDeliveryAddress, getAllDeliveryAddress, deleteDeliveryAddress, updateDeliveryAddress } = require("../../controllers/customer/deliveryAddressController")
const { staff, selfOrStaff, admin } = require("../../middleware/authorization")
const auth = require("../../middleware/auth")

router.post("/post", addDeliveryAddress);

router.get("/", [auth], getAllDeliveryAddress);

router.delete("/delete/:customerId", [auth, staff], deleteDeliveryAddress);

router.put("/update/:customerId", [auth, selfOrStaff], updateDeliveryAddress);

module.exports = router;