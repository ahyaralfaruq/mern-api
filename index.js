const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

// memanggil routes
const newsRoutes = require("./src/routes/news");
const authRoutes = require("./src/routes/auth");

const fileStorage = multer.diskStorage({
   destination: (req, file, callback) => {
      callback(null, "images");
   },
   filename: (req, file, callback) => {
      callback(null, new Date().getTime() + "-" + file.originalname);
   },
});

const fileFilter = (req, file, callback) => {
   if (
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png"
   ) {
      callback(null, true);
   } else {
      callback(null, false);
   }
};

// middleware
app.use(
   multer({
      storage: fileStorage,
      fileFilter: fileFilter,
   }).single("image")
);
app.use(bodyParser.json());
app.use("/images", express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {
   res.setHeader("Access-Control-Allow-Origin", "*");
   res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE, OPTIONS"
   );
   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
   next();
});

app.use("/v1/auth", authRoutes);
app.use("/v1/news", newsRoutes);

app.use((err, req, res, next) => {
   const status = err.errorStatus || 500;
   const message = err.message;
   const desc = err.desc;

   res.status(status).json({ message: message, description: desc });
});

mongoose
   .connect(
      "mongodb+srv://ahyaralfaruq:a2909039900r@cluster-ayar.wn8ue.mongodb.net/news?retryWrites=true&w=majority"
   )
   .then(() => {
      app.listen("2909", () => {
         console.log(`Listening server at port ${"http://localhost:2909"}`);
      });
   })
   .catch((err) => console.error(err));
