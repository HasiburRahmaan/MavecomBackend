const express = require("express");
const router = express.Router();
const {addTopPreferableProduct,getAllTopPreferableProduct,deleteTopPreferableProduct,updateTopPreferableProduct} = require("../../controllers/customer/topPreferableProductController")
const {staff} = require("../../middleware/authorization")
const {admin} = require("../../middleware/authorization")
const auth = require("../../middleware/auth")

router.post("/",addTopPreferableProduct );

router.get("/",[auth,staff],getAllTopPreferableProduct);

router.delete("/delete-top-preferable-product/:customerId",[auth,staff],deleteTopPreferableProduct);

router.put("/update-top-preferable-product/:customerId",[auth,staff],updateTopPreferableProduct);

module.exports = router;