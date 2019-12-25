const express = require("express");
const router = express.Router();
const { addTopPreferableSeller, getAllTopPreferableSeller, deleteTopPreferableSeller, updateTopPreferableSeller } = require("../../controllers/customer/topPreferableSellerController")
const { staff } = require("../../middleware/authorization")
const { admin } = require("../../middleware/authorization")
const auth = require("../../middleware/auth")

router.post("/post", addTopPreferableSeller);

router.get("/", [auth, staff], getAllTopPreferableSeller);

router.delete("/delete/:customerId", [auth, staff], deleteTopPreferableSeller);

router.put("/update/:customerId", [auth, staff], updateTopPreferableSeller);

module.exports = router;