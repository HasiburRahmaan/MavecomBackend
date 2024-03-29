const express = require("express");
const router = express.Router();
const {
    addSallerInfo,
    getAllSallerInfo,
    getSallerInfoById,
    deleteSallerInfo,
    updateSallerInfo} = require("../../controllers/customer/sallerInfoController")
const {staff} = require("../../middleware/authorization")
const {admin} = require("../../middleware/authorization")
const auth = require("../../middleware/auth")

router.post("/",addSallerInfo );

router.get("/",getAllSallerInfo); //[auth,staff],

router.get("/saller-id/:customerId", getSallerInfoById)

router.delete("/delete-saller-info/:customerId",[auth,staff],deleteSallerInfo);

router.put("/update-saller-info/:customerId",[auth,staff],updateSallerInfo);

module.exports = router;