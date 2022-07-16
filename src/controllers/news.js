const { validationResult } = require("express-validator");
const NewsCollection = require("../models/news");
const path = require("path");
const fs = require("fs");

// POST
exports.createNews = (req, res, next) => {
   const errors = validationResult(req);

   if (!errors.isEmpty()) {
      const err = new Error("invalid value");
      err.errorStatus = 400;
      err.desc = errors.array();
      throw err;
   }

   if (!req.file) {
      const err = new Error("images must be uploaded");
      err.errorStatus = 422;
      throw err;
   }

   const img = req.file.path;
   const title = req.body.title;
   const author = req.body.author;
   const desc = req.body.desc;

   const postingDataNews = new NewsCollection({
      title: title,
      image: img,
      desc: desc,
      author: {
         uid: 1,
         name: "Muhammad Ahyar",
      },
   });

   postingDataNews
      .save()
      .then((result) => {
         res.status(201).json({
            message: "Create news success !",
            data: result,
         });
      })
      .catch((err) => console.error(err));
};

// GET
exports.getAllNews = (req, res, next) => {
   NewsCollection.find()
      .then((result) => {
         res.status(200).json({
            message: "Get all news success !",
            data: result,
         });
      })
      .catch((err) => next(err));
};

exports.getNewsById = (req, res, next) => {
   const newsId = req.params.id;
   NewsCollection.findById(newsId)
      .then((result) => {
         if (!result) {
            const error = new Error("ID Not Found");
            error.errorStatus(404);
            throw error;
         }

         res.status(200).json({
            message: "Fetch data news success !",
            data: result,
         });
      })
      .catch((err) => next(err));
};

// UPDATE
exports.updateNews = (req, res, next) => {
   const errors = validationResult(req);

   if (!errors.isEmpty()) {
      const err = new Error("invalid value");
      err.errorStatus = 400;
      err.desc = errors.array();
      throw err;
   }

   if (!req.file) {
      const err = new Error("images must be uploaded");
      err.errorStatus = 422;
      throw err;
   }

   const img = req.file.path;
   const title = req.body.title;
   const author = req.body.author;
   const desc = req.body.desc;

   const newsId = req.params.id;

   NewsCollection.findById(newsId)
      .then((post) => {
         if (!post) {
            const error = new Error("ID News not found");
            error.errorStatus(404);
            throw error;
         }

         removeImage(post.image);

         post.title = title;
         post.image = img;
         post.author = author;
         post.desc = desc;

         return post.save();
      })
      .then((result) => {
         res.status(200).json({
            message: "update news has been success !",
            data: result,
         });
      })
      .catch((err) => next(err));
};

// DELETE
exports.deleteNews = (req, res, next) => {
   const newsId = req.params.id;

   NewsCollection.findById(newsId)
      .then((post) => {
         if (!post) {
            const error = new Error("ID News not found");
            error.errorStatus(404);
            throw error;
         }

         removeImage(post.image);

         return NewsCollection.findByIdAndRemove(newsId);
      })
      .then((result) => {
         res.status(200).json({
            message: "Delete news has been success !",
            data: result,
         });
      })
      .catch((err) => next(err));
};

const removeImage = (pathFile) => {
   pathFile = path.join(__dirname, "../..", pathFile);

   fs.unlink(pathFile, (err) => console.log(err));
};
