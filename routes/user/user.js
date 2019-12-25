const auth = require("../../middleware/auth");
const { customer } = require("../../controllers/user/userController");
const { signup } = require("../../controllers/user/userController");
const { updatePassword } = require("../../controllers/user/userController");
const {staff,selfOrStaff,admin} = require("../../middleware/authorization")
const express = require("express");
const router = express.Router();

router.get("/me", auth, customer);

router.post("/signup", signup);

router.put("/updatePassword", [auth,selfOrStaff], updatePassword);

module.exports = router;
