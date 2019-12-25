const express = require("express");
const router = express.Router();
const {
  addTag,
  getAllTag,
  getTagById,
  updateTag,
  deleteTag
} = require("../../controllers/product/tagController");

const { staff } = require("../../middleware/authorization");
const { admin } = require("../../middleware/authorization");
const auth = require("../../middleware/auth");

//Post
router.post("/post", addTag);

//Get
router.get("/", getAllTag);

router.get("/:id", getTagById);

//Put
router.put("/update/:id", [auth, staff], updateTag);

//Delete
router.delete("/delete/:id", [auth, staff], deleteTag);

module.exports = router;
