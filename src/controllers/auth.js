const { validationResult } = require("express-validator");

exports.register = (req, res, next) => {
   const nama = req.body.name;
   const email = req.body.email;
   const password = req.body.password;

   const errors = validationResult(req);

   if (!errors.isEmpty()) {
      const err = new Error("Invalid value");
      err.errorStatus = 400;
      err.desc = errors.array();
      throw err;
   }

   const result = {
      message: "Call API Success",
      data: {
         uid: 1,
         name: nama,
         email: email,
         password: password,
      },
   };

   res.status(201).json(result);
   next();
};
