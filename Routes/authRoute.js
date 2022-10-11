const { Router } = require("express");
const { handleLogin } = require("../Controller/authController");
const authRouter = Router();

authRouter.post("/login", handleLogin);

module.exports = authRouter;
