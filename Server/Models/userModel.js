// models/userModel.js
const mongoose = require("mongoose");

const User = mongoose.model("users", {
  email: String,
  password: String,
});

module.exports = User;
