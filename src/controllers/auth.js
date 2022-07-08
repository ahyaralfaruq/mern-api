exports.register = (req, res, next) => {
   const nama = req.body.name;
   const email = req.body.email;
   const password = req.body.password;

   const result = {
      status: 201,
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
