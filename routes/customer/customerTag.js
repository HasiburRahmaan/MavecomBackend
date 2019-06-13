const express = require("express");
const router = express.Router();
const {addCustomerTag,getAllCustomerTag,deleteCustomerTag,updateCustomerTag} = require("../../controllers/customer/customerTagController")
const {staff} = require("../../middleware/authorization")
const {admin} = require("../../middleware/authorization")
const auth = require("../../middleware/auth")

router.post("/",addCustomerTag );

router.get("/",[auth,staff],getAllCustomerTag);

router.delete("/delete-customer-tag/:customerId",[auth,staff],deleteCustomerTag);

router.put("/update-customer-tag/:customerId",[auth,staff],updateCustomerTag);

module.exports = router;