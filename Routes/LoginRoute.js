const { Router } = require("express");
const LoginController = require("../Controller/LoginController");

const loginRouter = Router();

loginRouter.post("/login", LoginController.HandleLogin);

module.exports = loginRouter;
