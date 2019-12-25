const express = require('express');
const router = express.Router();
const {
  addUpdateRequestedProduct,
  getAllUpdateRequestedProducts,
  getUpdateRequestedProductById,
  getUpdateRequestedProductBybrandName,
  putUpdateRequestedProductById,
  deleteUpdateRequestedProductById
} = require('../../controllers/productRequest/updateRequestedProductController');

const { staff } = require('../../middleware/authorization');
const auth = require('../../middleware/auth');

router.post('/', addUpdateRequestedProduct);
router.get('/', [auth, staff], getAllUpdateRequestedProducts);
router.get(
  '/productId/:productId',
  [auth, staff],
  getUpdateRequestedProductById
);
router.get(
  '/brand/:brandName',
  [auth, staff],
  getUpdateRequestedProductBybrandName
);
router.put('/update/:productId', [auth, staff], putUpdateRequestedProductById);
router.delete(
  '/delete/:productId',
  [auth, staff],
  deleteUpdateRequestedProductById
);

module.exports = router;
