const express = require('express');
const router = express.Router();
const {
  addProductUpdateRequest,
  getAllProductUpdateRequest,
  getProductUpdateRequestById,
  getProductUpdateRequestByName,
  putProductUpdateRequestById,
  deleteProductUpdateRequestById
} = require('../../controllers/productRequest/productUpdateRequestController');

const { staff } = require('../../middleware/authorization');
const auth = require('../../middleware/auth');

router.post('/',addProductUpdateRequest);
router.get('/', [auth, staff], getAllProductUpdateRequest);
router.get('/productId/:productId', [auth, staff], getProductUpdateRequestById);
//router.get("/brand/:brandName", getProductUpdateRequestByName);
router.put('/update/:productId', [auth, staff], putProductUpdateRequestById);
router.delete('/delete/:productId', [auth, staff],deleteProductUpdateRequestById);

module.exports = router;
