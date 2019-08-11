const Joi = require("joi");
const mongoose = require("mongoose");

const Login = mongoose.model(
  "Login",
  new mongoose.Schema({
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255
    },
    date: {
      type: Date,
      required: true,
      minlength: 5,
      maxlength: 255
    }
  })
);

exports.Login = Login;
