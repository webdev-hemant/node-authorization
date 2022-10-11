const HandleLogin = (req, res, next) => {
  res.send({ body: req.body });
};

module.exports = { HandleLogin };
