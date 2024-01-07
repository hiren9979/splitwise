// controllers/userController.js
const express = require("express");
const userService = require("../Services/authService");

const router = express.Router();

router.post("/login", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  const result = await userService.loginUser(email, password);

  if (result.success) {
    res.json({
      success: true,
      data: result.data,
      message: result.message,
      status: result.status,
    });
  } else {
    res.json({
      success: result.success,
      data: result.data,
      message: result.message,
      status: result.status,
    });
  }
});

router.post("/register", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  const result = await userService.registerUser(email, password);

  if (result.success) {
    res.json({
      success: true,
      data: result.data,
      message: result.message,
      status: result.status,
    });
  } else {
    res.json({
      success: result.success,
      data: result.data,
      message: result.message,
      status: result.status,
    });
  }
});

module.exports = router;
