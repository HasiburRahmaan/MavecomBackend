const express = require("express");
const {
  addProduct,
  getProducts,
  getProductAdditionalInfo,
  getProductById,
  getProductByTopDiscount,
  getProductByBrandName,
  getProductByDeptName,
  updateProduct,
  deleteProduct,
  getHotDepartmentsProducts
} = require("../../controllers/product/productController");
const router = express.Router();

const { staff } = require("../../middleware/authorization");
const { admin } = require("../../middleware/authorization");
const auth = require("../../middleware/auth");

//Post Product
router.post("/", addProduct);

//Get All Products
router.get("/", getProducts);

//Get product additional info.
router.get("/additional-info/:id", getProductAdditionalInfo);

//Get Product by Id
router.get("/id/:id", getProductById);



//Get Product by department name
router.get("/department/:name", getProductByDeptName);

//Get Product by Brand Name
router.get("/brand/:name", getProductByBrandName);

//Get Product by Top Discount
router.get("/top-discounts", getProductByTopDiscount);

//Put Request
//router.put("/:id", [auth, staff], updateProduct);

//Put Request
router.put("/update/:id", updateProduct);

//Delete Request
router.delete("/delete/:id", deleteProduct);

//hot department
router.get("/hot-departments", getHotDepartmentsProducts);

module.exports = router;
