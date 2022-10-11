const handleLogin = (req, res, next) => {
  console.log(req.body);
  res.send({ body: req.body });
};

module.exports = { handleLogin };
