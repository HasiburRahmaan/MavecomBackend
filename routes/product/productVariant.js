const express = require("express");
const router = express.Router();
const {
  addProductVariant,
  getAllProductVariant,
  getProductVariantById,
  getProductByProductAndVairantId,
  updateProductVariant,
  deleteProductVariant,

} = require("../../controllers/product/productVariantController");

const { staff } = require("../../middleware/authorization");
const { admin } = require("../../middleware/authorization");
const auth = require("../../middleware/auth");

//Post
router.post("/post", addProductVariant);

// Get
// router.get('/',[auth, staff], getAllProductVarient);

//Get
router.get("/", getAllProductVariant);

router.get("/:id", getProductVariantById);

//Get Product by product and varient id 
router.get("/id/:productId/:variantId", getProductByProductAndVairantId);

//Put
//router.put("/:id", [auth, staff], updateProductVarient);
router.put("/update/:id", updateProductVariant);

//Delete
router.delete("/delete/:id", deleteProductVariant); //[auth, staff],

module.exports = router;
