const express = require("express");
const router = express.Router();
const {
    addBodyDetails,
    getAllBodyDetails,
    getBodyDetailsById,
    deleteBodyDetails,
    updateBodyDetails,
} = require("../../controllers/customer/bodyDetailsController")
const {staff} = require("../../middleware/authorization")
const {admin} = require("../../middleware/authorization")
const auth = require("../../middleware/auth")

router.post("/",addBodyDetails );

router.get("/",getAllBodyDetails); //[auth,staff],

router.get("/:id", getBodyDetailsById);

router.delete("/delete-body-details/:customerId",[auth,staff],deleteBodyDetails);

router.put("/update-body-details/:customerId",[auth,staff],updateBodyDetails);

module.exports = router;