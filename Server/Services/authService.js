// services/userService.js
const User = require("../Models/userModel");
const bcrypt = require("bcryptjs");
const ResponseModel = require("../Models/responseModel");
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

async function loginUser(req) {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      const token = jwt.sign(
        { loginUserId: user.id, loginUsername: user.name },
        secretKey,
        { expiresIn: "12h" }
      );
      return new ResponseModel(true, { user, token }, "Login successful", 200);
    } else {
      return new ResponseModel(false, null, "Invalid email or password", 200);
    }
  } catch (error) {
    console.error("Error:", error);
    return new ResponseModel(false, null, "Internal server error", 500);
  }
}

async function registerUser(req) {
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return new ResponseModel(false, null, "Email already registered", 409);
    }

    const user = new User(req.body);

    // hash password
    if (req.body.password) user.password = bcrypt.hashSync(req.body.password);
    await user.save();
    user.password = "For security reason password is not available";

    return new ResponseModel(true, user, "Registration successfull", 200);
  } catch (error) {
    console.error("Error:", error);
    return new ResponseModel(false, null, "Internal server error", 500);
  }
}

module.exports = {
  loginUser,
  registerUser,
};
