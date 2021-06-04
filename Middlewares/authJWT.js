const jwt = require("jsonwebtoken");
const { secret } = require("../config/index");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {

  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    
    console.log("JWT AUTH TOKEN VERIFIED", decoded);
    req.userId = decoded.id;
    next();
  });
};

module.exports = verifyToken;
