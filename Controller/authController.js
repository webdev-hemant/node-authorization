const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./.env" });
const User = require("../models/Users");

const handleErrors = (err = {}) => {
  const error = {};
  // login--------------------------------------------
  if (err.message === "incorrect email") {
    error.email = "email is invalid";
  }
  if (err.message === "incorrect password") {
    error.password = "password is incorrect";
  }
  // signup-------------------------------------------
  if (err.code === 11000) {
    error.email = "Email already registered!";
    return error;
  }
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      error[properties.path] = properties.message;
    });
  }
  return error;
};

const maxAge = 3 * 24 * 60 * 60;
const createJwt = (id) => {
  return jwt.sign({ id }, process.env.SECRETKEY, {
    expiresIn: maxAge,
  });
};

module.exports.signup = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    const token = createJwt(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createJwt(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
