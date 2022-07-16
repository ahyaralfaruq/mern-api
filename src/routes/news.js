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

// UPDATE => METHOD PUT
router.put(
   "/post/:id",
   [
      body("title")
         .isLength({ min: 5 })
         .withMessage("Title at least 5 character"),
      body("desc")
         .isLength({ min: 10 })
         .withMessage("Title at least 10 character"),
   ],
   newsController.updateNews
);

// DELETE => METHOD DELETE
router.delete("/post/:id", newsController.deleteNews);

module.exports = router;
