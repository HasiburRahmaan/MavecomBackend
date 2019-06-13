const express = require('express');
const router = express.Router();
const {
  addCustomer,
  getAllCustomers,
  getCustomerById,
  getCustomersByUserName,
  deleteCustomer,
  updateCustomer,
  getCustomersByName,
  getCustomersByCity,
  getCustomerByDivision
} = require('../../controllers/customer/customerController');
const { staff } = require('../../middleware/authorization');
const { admin } = require('../../middleware/authorization');
const auth = require('../../middleware/auth');

router.post('/', addCustomer);

router.get('/',  getAllCustomers); //[auth, staff],

router.get('/customer-id/:customerId',[auth, staff],  getCustomerById); 

router.delete('/delete-customer/:customerId', [auth, staff], deleteCustomer);

router.put('/update-customer/:customerId', [auth], updateCustomer);

router.get('/username/:username', [auth, staff], getCustomersByUserName);

router.get('/name/:customerName', [auth, staff], getCustomersByName);

router.get('/address/city/', [auth, staff], getCustomersByCity);

router.get('/address/division/', [auth, staff], getCustomerByDivision);
module.exports = router;
