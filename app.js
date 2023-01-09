const express = require("express");
const app = express();
const user = require("./routes/users");

app.use(express.json());

app.use("/api/user", user);

module.exports = app;
