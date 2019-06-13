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

router.post("/", addProductVarificationRequest);
router.get("/", getAllProductVarificationRequest);
router.get("/productId/:productId", getProductVarificationRequestsById);
router.get("/brand/:brandName", getProductVarificationRequestBybrandName);
router.put("/update/:productId", putProductVarificationRequestById);
router.delete("/delete/:productId", deleteProductVarificationRequestById);

module.exports = router;