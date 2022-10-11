const HandleLogin = (req, res, next) => {
  console.log(req.body);
  res.send({ body: req.body });
};

module.exports = { HandleLogin };
