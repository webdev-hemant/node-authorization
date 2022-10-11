const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const loginRouter = require("./Routes/LoginRoute");
const app = express();
const PORT = process.env.PORT || 7000;
dotenv.config({ path: "./.env" });
//add public folder
app.use(express.static("public"));

// database connection
const diURI = process.env.MONGODBURI || "";

// middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//routes middlewares
app.use(loginRouter);

// all Routes
app.get("/", (req, res) => {
  res.send({ message: "Yes its working!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port = ${PORT}`);
});
