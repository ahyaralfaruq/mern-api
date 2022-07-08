const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth");

router.post("/account/register", authController.register);

module.exports = router;
