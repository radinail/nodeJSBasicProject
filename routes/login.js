const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const { Login } = require("../models/login");

const loginRoute = express.Router();

loginRoute.post("/", async (req, res) => {
  const logedUser = req.body;

  let user = await User.findOne({ email: logedUser.email });
  if (!user) return res.status(400).send("Invalid email and Password");

  let passwordCompare = await bcrypt.compare(logedUser.password, user.password);
  if (!passwordCompare) return res.status(400).send("Invalid password");

  let newConnection = new Login({
    email: logedUser.email,
    date: new Date()
  });

  newConnection = await newConnection.save();

  const token = jwt.sign({ _id: user._id }, process.env.PRIVATEKEY);
  res.status(200).send(token);
});

module.exports = loginRoute;
