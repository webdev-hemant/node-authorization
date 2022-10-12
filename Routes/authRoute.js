const { Router } = require("express");
const authController = require("../Controller/authController");
const authRouter = Router();

authRouter.post("/signup", authController.signup);
authRouter.post("/login", authController.login);
authRouter.get("/logout", authController.logout);

module.exports = authRouter;
