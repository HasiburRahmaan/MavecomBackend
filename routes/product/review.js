const express = require("express");
const router = express.Router();

const { createProductReview,
    getProductReviewByProductId,
    getAllProductReview,
    updateSingleReviewOfProduct,
    deleteSingleReviewOfProduct
} = require('../../controllers/product/reviewController')

//Post
router.post("/", createProductReview);

//Get
router.get("/", getAllProductReview)

router.get("/:id", getProductReviewByProductId)

//Update
router.put("/", updateSingleReviewOfProduct)

//Delete
router.delete("/delete_review", deleteSingleReviewOfProduct)


module.exports = router;