const Joi = require("joi");
const { login } = require("../../controllers/auth/authController");
const express = require("express");
const router = express.Router();

router.post("/", login);

module.exports = router;
