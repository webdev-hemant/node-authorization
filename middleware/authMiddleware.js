require("dotenv").config({ path: "./.env" });
const jwt = require("jsonwebtoken");
const User = require("../models/Users");

module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.SECRETKEY, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/login");
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.status(403).send({ message: "you are not authorized" });
    // res.redirect("/");
  }
};

module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.SECRETKEY, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        next();
      } else {
        console.log(decodedToken);
        let user;
        User.findById(decodedToken.id)
          .then((res) => (user = res))
          .catch((err) => console.log(err));
        console.log({ checkUser: user });
      }
    });
  } else {
    next();
  }
};
