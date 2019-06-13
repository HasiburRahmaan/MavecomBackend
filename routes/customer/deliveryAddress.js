const express = require("express");
const router = express.Router();
const {addDeliveryAddress,getAllDeliveryAddress,deleteDeliveryAddress,updateDeliveryAddress} = require("../../controllers/customer/deliveryAddressController")
const {staff} = require("../../middleware/authorization")
const {admin} = require("../../middleware/authorization")
const auth = require("../../middleware/auth")

router.post("/",addDeliveryAddress );

router.get("/",[auth,staff],getAllDeliveryAddress);

router.delete("/delete-delivery-address/:customerId",[auth,staff],deleteDeliveryAddress);

router.put("/update-delivery-address/:customerId",[auth,staff],updateDeliveryAddress);

module.exports = router;