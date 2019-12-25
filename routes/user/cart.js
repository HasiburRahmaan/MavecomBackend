const express = require("express");
const router = express.Router();

const { readUserCartData, addSingleProductOnCart, updateCart } = require("../../controllers/user/cartController")


router.post('/', addSingleProductOnCart)
router.get('/id', readUserCartData)
router.put('/', updateCart)

module.exports = router;