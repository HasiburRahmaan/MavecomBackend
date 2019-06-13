const auth = require("../../middleware/auth");
const { customer } = require("../../controllers/user/userController");
const { signup } = require("../../controllers/user/userController");
const express = require("express");
const router = express.Router();

router.get("/me", auth, customer);

router.post("/signup", signup);

module.exports = router;
