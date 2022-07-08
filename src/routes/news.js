const express = require("express");
const router = express.Router();

// get method by controllers
const newsController = require("../controllers/news");

// CREATE => METHOD POST
router.post("/post", newsController.createNews);

// READ => METHOD GET
router.get("/get", newsController.getAllNews);

module.exports = router;
