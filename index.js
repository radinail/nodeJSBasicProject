const mongoose = require("mongoose");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const users = require("./routes/user");
const login = require("./routes/login");
const express = require("express");
const auth = require("./middlewares/auth");
const app = express();

mongoose
  .connect("mongodb://localhost:27017/vidly")
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB..."));

app.use(express.json());
app.use("/api/genres", auth);
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/users", users);
app.use("/api/login", login);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
