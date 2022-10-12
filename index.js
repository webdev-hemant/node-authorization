const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config({ path: "./.env" });
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRouter = require("./Routes/authRoute");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");
const app = express();
const PORT = process.env.PORT || 8000;

//add public folder
app.use(express.static("public"));

// database connection
const dbURI = process.env.MONGODB;

// middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// mongo connect
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`mongodb conected and server started on port ${PORT}`);
    })
  )
  .catch((err) => console.log({ err }));

//routes middlewares
app.use(authRouter);

// check user
app.get("*", checkUser);

// Home Route
app.get("/", (req, res) => {
  res.send({ message: "Yes its working!" });
});

//required auth
app.get("/dashboard", requireAuth, (req, res) => {
  res.send({ message: "auth successfull" });
});
