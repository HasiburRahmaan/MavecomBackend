const express = require("express");
const router = express.Router();
const {addCustomerSearchKeywords,getAllCustomerSearchKeywords,deleteCustomerSearchKeywords,updateCustomerSearchKeywords} = require("../../controllers/customer/customerSearchKeywordsController")
const {staff} = require("../../middleware/authorization")
const {admin} = require("../../middleware/authorization")
const auth = require("../../middleware/auth")

router.post("/",addCustomerSearchKeywords );

router.get("/",[auth,staff],getAllCustomerSearchKeywords);

router.delete("/delete-customer-search-keywords/:customerId",[auth,staff],deleteCustomerSearchKeywords);

router.put("/update-customer-search-keywords/:customerId",[auth,staff],updateCustomerSearchKeywords);

module.exports = router;