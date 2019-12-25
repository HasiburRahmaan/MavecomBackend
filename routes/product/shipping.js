const express = require("express");
const router = express.Router();
const {
  addShipping,
  getAllShipping,
  getShippingById,
  updateShipping,
  deleteShipping
} = require("../../controllers/product/shippingController");

const { staff } = require("../../middleware/authorization");
const { admin } = require("../../middleware/authorization");
const auth = require("../../middleware/auth");

//Post
router.post("/post", addShipping);

//Get
// router.get('/',[auth, staff], getAllShipping);
router.get("/", getAllShipping);

router.get("/:id", getShippingById);

//Put
router.put("/update/:id", updateShipping);

//Delete
router.delete("/update/:id", [auth, staff], deleteShipping);

module.exports = router;
