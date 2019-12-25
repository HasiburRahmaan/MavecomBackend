const express = require("express");
const router = express.Router();
const {
    addProductVarificationRequest,
    getAllProductVarificationRequest,
    getProductVarificationRequestsById,
    getProductVarificationRequestBybrandName,
    putProductVarificationRequestById,
    deleteProductVarificationRequestById
} = require("../../controllers/productRequest/productVarificationRequestController")


const { staff } = require('../../middleware/authorization');
const auth = require('../../middleware/auth');

router.post("/", [auth, staff],addProductVarificationRequest);
router.get("/", [auth, staff], getAllProductVarificationRequest);
router.get("/productId/:productId", [auth, staff], getProductVarificationRequestsById);
router.get("/brand/:brandName", [auth, staff], getProductVarificationRequestBybrandName);
router.put("/update/:productId", [auth, staff], putProductVarificationRequestById);
router.delete("/delete/:productId", [auth, staff], deleteProductVarificationRequestById);

module.exports = router;