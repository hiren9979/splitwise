import express from "express";
import response from "../../common/response.js";
import { createUser, getUsers, login } from "../../db/user.js";
import bcrypt from "bcrypt";

var router = express.Router();

// display user page
router.get("/", async function (req, res) {
  try {
    const result = await getUsers();
    res.send(result);
  } catch (error) {}
});

router.post("/createUser", async function (req, res) {
  try {
    const name = req.body.name;
    const password = req.body.password;
    const authToken = req.body.authToken;
    const email = req.body.email;

    const hashedPassword = await bcrypt.hash(password, 10);
    const data = {
      name: req.body.name,
      email: req.body.email,
      authToken: req.body.authToken,
      password : hashedPassword
    };
    const info = await createUser(data);
    res.send(info);
  } catch (error) {
    res.send(response.internalServerError);
  }
});

router.get("/login", async function (req, res) {
  try {
    const data = {
      email: req.headers.email,
      password: req.headers.password,
    };

    const info = await login(data);
    res.send(info);
  } catch (error) {
    res.send(response.internalServerError);
  }
});

export default router;
