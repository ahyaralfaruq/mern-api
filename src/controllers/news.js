// POST
exports.createNews = (req, res, next) => {
   const img = req.body.image;
   const title = req.body.title;
   const author = req.body.author;
   const date = req.body.date;
   const desc = req.body.desc;

   const result = {
      message: "Create news success !",
      data: {
         uid: 1,
         // image: "image.jpg",
         title: "Lorem ipsum",
         author: "crimson chin",
         date: "09 Maret 2019",
         desc: "Most modern React projects manage their dependencies using a package manager like npm or Yarn. To add React Router to an existing project, the first thing you should do is install the necessary",
      },
   };

   res.status(201).json(result);
   next();
};

// GET
exports.getAllNews = (req, res, next) => {
   res.json({
      message: "Get all news success !",
      data: [
         {
            uid: 1,
            // image: "image.jpg",
            title: "Lorem ipsum",
            author: "crimson chin",
            date: "09 Maret 2019",
            desc: "Most modern React projects manage their dependencies using a package manager like npm or Yarn. To add React Router to an existing project, the first thing you should do is install the necessary",
         },
         {
            uid: 2,
            // image: "image.jpg",
            title: "Lorem ipsum 2",
            author: "crimson chin",
            date: "29 Maret 2019",
            desc: "Most modern React projects manage their dependencies using a package manager like npm or Yarn. To add React Router to an existing project, the first thing you should do is install the necessary",
         },
         {
            uid: 3,
            // image: "image.jpg",
            title: "Lorem ipsum 3",
            author: "crimson chin",
            date: "19 April 2019",
            desc: "Most modern React projects manage their dependencies using a package manager like npm or Yarn. To add React Router to an existing project, the first thing you should do is install the necessary",
         },
      ],
   });
   next();
};
