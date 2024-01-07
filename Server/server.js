// server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authController = require("./Controller/UserController");
const dotenv = require("dotenv").config();

const app = express();

var corsOptions = {
    origin: "http://yourfrontenddomain.com",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // enable set cookie
  };
var cors = require('cors');
app.use(cors(corsOptions));

const port = process.env.PORT;
const server = require("http").createServer(app);

mongoose.connect(`mongodb://localhost:27017/${process.env.DBName}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


app.use(bodyParser.json());

app.use("/Users", authController);

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
