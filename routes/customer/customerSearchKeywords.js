const express = require("express");
const router = express.Router();
const {
    addCustomerSearchKeywords,
    getAllCustomerSearchKeywords,
    getSingleCustomerSearchKeywordListById,
    deleteCustomerSearchKeywords,
    updateCustomerSearchKeywords
} = require("../../controllers/customer/customerSearchKeywordsController")
const {staff} = require("../../middleware/authorization")
const {admin} = require("../../middleware/authorization")
const auth = require("../../middleware/auth")

router.post("/",addCustomerSearchKeywords );

router.get("/",getAllCustomerSearchKeywords); //[auth,staff]

router.get('/:id', getSingleCustomerSearchKeywordListById);

router.delete("/delete-customer-search-keywords/:customerId",[auth,staff],deleteCustomerSearchKeywords);

router.put("/update-customer-search-keywords/:customerId",[auth,staff],updateCustomerSearchKeywords);

module.exports = router;