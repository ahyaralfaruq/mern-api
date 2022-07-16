const express = require("express");
const router = express.Router();

const { body } = require("express-validator");

// get method by controllers
const newsController = require("../controllers/news");

// CREATE => METHOD POST
router.post(
   "/post",
   [
      body("title")
         .isLength({ min: 5 })
         .withMessage("Title at least 5 character"),
      body("desc")
         .isLength({ min: 10 })
         .withMessage("Title at least 10 character"),
   ],
   newsController.createNews
);

// READ => METHOD GET
router.get("/get", newsController.getAllNews);
router.get("/get/:id", newsController.getNewsById);

module.exports = router;
