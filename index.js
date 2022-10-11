const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const authRouter = require("./Routes/authRoute");
dotenv.config({ path: "./.env" });
const app = express();
const PORT = process.env.PORT || 8000;

//add public folder
app.use(express.static("public"));

// database connection
const dbURI = process.env.MONGODB;

// middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

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

// Home Route
app.get("/", (req, res) => {
  res.send({ message: "Yes its working!" });
});
