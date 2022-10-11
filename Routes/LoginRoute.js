const { Router } = require("express");
const { HandleLogin } = require("../Controller/LoginController");
const loginRouter = Router();

loginRouter.post("/login", HandleLogin);

module.exports = loginRouter;
