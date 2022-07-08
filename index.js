const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// memanggil routes
const newsRoutes = require("./src/routes/news");
const authRoutes = require("./src/routes/auth");

// middleware
app.use(bodyParser.json());

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

app.listen("2909", () => {
   console.log(`Listening server at port ${"http://localhost:2909"}`);
});
