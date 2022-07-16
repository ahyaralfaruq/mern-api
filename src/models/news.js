const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NewsCollection = new Schema(
   {
      title: {
         type: String,
         required: true,
      },
      image: {
         type: String,
         required: true,
      },
      desc: {
         type: String,
         required: true,
      },
      author: {
         type: Object,
         required: true,
      },
   },
   {
      timestamps: true,
   }
);

module.exports = mongoose.model("NewsCollection", NewsCollection);
