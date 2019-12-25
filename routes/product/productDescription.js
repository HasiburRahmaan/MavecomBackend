const express = require("express");
const router = express.Router();
const {
  addProductDescription,
  getAllProductDescription,
  getProductDescriptionById,
  updateProductDescription,
  deleteProductDescription
} = require("../../controllers/product/productDescriptrionController");

const { staff } = require("../../middleware/authorization");
const { admin } = require("../../middleware/authorization");
const auth = require("../../middleware/auth");

//Post
router.post("/post", addProductDescription);

//Get
router.get("/", getAllProductDescription);

router.get("/:id", getProductDescriptionById);

//Put
router.put("/update/:id", updateProductDescription);

//Delete
router.delete("/delete/:id", [auth, staff], deleteProductDescription);

module.exports = router;
