module.exports.signup = (req, res, next) => {
  console.log(req.body);
  res.send({ body: req.body });
};
module.exports.login = (req, res, next) => {
  console.log(req.body);
  res.send({ body: req.body });
};
