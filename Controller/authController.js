const User = require("../models/Users");

module.exports.signup = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    res.status(201);
    res.send({ user });
  } catch (error) {
    console.log({ error });
    res.status(400);
    res.send("error, user not created!");
  }
};

module.exports.login = async (req, res, next) => {
  console.log(req.body);
  res.send({ body: req.body });
};
