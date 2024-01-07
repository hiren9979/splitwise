// services/userService.js
const User = require("../Models/userModel");
const ResponseModel = require("../Models/responseModel");

async function loginUser(email, password) {
  try {
    const user = await User.findOne({ email, password });

    if (user) {
      return new ResponseModel(true, user, "Login successful", 200);
    } else {
      return new ResponseModel(false, null, "Invalid email or password", 200);
    }
  } catch (error) {
    console.error("Error:", error);
    return new ResponseModel(false, null, "Internal server error", 500);
  }
}

async function registerUser(email, password) {
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return new ResponseModel(false, null, "Email already registered", 409);
    }

    // Create a new user
    const newUser = new User({ email, password });
    await newUser.save();

    return new ResponseModel(true, null, "Registration successfull", 200);
  } catch (error) {
    console.error("Error:", error);
    return new ResponseModel(false, null, "Internal server error", 500);
  }
}

module.exports = {
  loginUser,
  registerUser,
};
