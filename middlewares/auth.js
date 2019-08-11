const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(400).send("Access denied, no token found");

  try {
    const decoded = jwt.verify(token, process.env.PRIVATEKEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send("Invalid token");
  }
};

module.exports = auth;
