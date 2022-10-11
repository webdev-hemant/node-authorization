const express = require("express");
const mongoose = require("mongoose");
const loginRouter = require("./Routes/LoginRoute");
const app = express();
const PORT = process.env.PORT || 7000;

//add public folder
app.use(express.static("public"));

// database connection
const diURI = process.env.MONGODBURI || "";

//routes middlewares
app.use(loginRouter);

// all Routes
app.get("/", (req, res) => {
  res.send({ message: "Yes its working!" });
});
