const mongoose = require("mongoose");
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "email id required"],
    unique: [true, "user already exist"],
    lowercase: true,
    validate: [isEmail, "please enter valid email"],
  },
  password: {
    type: String,
    required: [true, "password required"],
    minLength: [6, "please enter min six charactor password"],
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
