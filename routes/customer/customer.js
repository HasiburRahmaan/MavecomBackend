const express = require("express");
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
  getCustomerByDivision,
  getSelf
} = require("../../controllers/customer/customerController");
const {
  staff,
  admin,
  self,
  selfOrStaff
} = require("../../middleware/authorization");
const auth = require("../../middleware/auth");

router.post("/post", addCustomer);

// router.get("/", [auth, staff], getAllCustomers);
router.get("/", getAllCustomers);

router.get("/id/:customerId", getCustomerById); //[auth, selfOrStaff]

router.get("/self", [auth], getSelf);

router.delete("/delete/:customerId", [auth, staff], deleteCustomer);

router.put("/update/:customerId", [auth, selfOrStaff], updateCustomer);

router.get("/username/:username", [auth, staff], getCustomersByUserName);

router.get("/name/:customerName", [auth, staff], getCustomersByName);

router.get("/address/city/", [auth, staff], getCustomersByCity);

router.get("/address/division/", [auth, staff], getCustomerByDivision);
module.exports = router;
