const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const authController = require("../controllers/auth");

router.post(
   "/account/register",
   [
      body("name")
         .isLength({ min: 3 })
         .withMessage("Name at least 3 character")
         .matches(/(a-zA-Z0-9)/)
         .withMessage("Name cannot contain special characters"),
      body("email")
         .isEmail()
         .withMessage("Your input is not an Email")
         .trim()
         .withMessage("Email cannot contain space character"),
      body("password")
         .isLength({ min: 8 })
         .withMessage("Your password at least 8 character"),
   ],
   authController.register
);

module.exports = router;
