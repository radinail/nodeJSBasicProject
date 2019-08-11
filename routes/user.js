var bcrypt = require("bcrypt");
var _ = require("lodash");
const express = require("express");
const jwt = require("jsonwebtoken");
const { User, validate } = require("../models/user");
const userRouter = express.Router();
const Joi = require("joi");

const hashPassword = async password => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

userRouter.post("/", async (req, res) => {
  const userInformation = req.body;
  if (validate(userInformation).error) {
    return res
      .status(400)
      .send(validate(userInformation).error.details[0].message);
  }
  let user = await User.findOne({ email: userInformation.email });
  if (user) return res.status(400).send("User already exist");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userInformation.password, salt);

  let newUser = new User({
    ...userInformation,
    password: hashedPassword
  });
  newUser = await newUser.save();

  const token = jwt.sign({ _id: newUser._id }, process.env.PRIVATEKEY);
  res
    .header("x-auth-token", token)
    .send(_.pick(newUser, ["id", "name", "email"]));
});

module.exports = userRouter;
