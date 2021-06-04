const db = require("../models");
const User = db.user;

const { validationResult } = require("express-validator");

checkDuplicateUsernameOrEmail = (req, res, next) => {
  console.log("running verifySignUp!!!!", req.body.username);
  //check validation first

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("ERROR INSIDE VERIFY");
    const errorMessages = errors.array().map((error) => error.msg);
    return res.status(400).json({ errors: errorMessages });
  }

  //if passes move on to username/email duplicates
  
  // Username
  User.findAll({
    where: {
      username: req.body.username,
    },
  }).then((user) => {
    //if no users is found comes back [];
    if (user.length > 0) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }
    //email
    User.findAll({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
      console.log("USER BY EMAIL SEARCH", user);
      if (user.length > 0) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }
    });
    next();
  });
};

module.exports = checkDuplicateUsernameOrEmail;
