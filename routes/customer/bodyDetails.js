const express = require("express");
const router = express.Router();
const {
    addBodyDetails,
    getAllBodyDetails,
    getBodyDetailsById,
    deleteBodyDetails,
    updateBodyDetails,
} = require("../../controllers/customer/bodyDetailsController")
const { staff, admin, selfOrStaff } = require("../../middleware/authorization")
const auth = require("../../middleware/auth")

router.post("/post", addBodyDetails);

router.get("/", [auth, staff], getAllBodyDetails);

router.delete("/delete/:customerId", [auth, staff], deleteBodyDetails);

router.put("/update/:customerId", [auth, selfOrStaff], updateBodyDetails);

module.exports = router;