const{ secret } = require("../config/index")
const db = require("../models");
const User = db.user;

var jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");

exports.signup = (req, res) => {
 
  console.log("INSIDE USER CONTROLLER");

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("ERROR INSIDE CONTROLLER");
    const errorMessages = errors.array().map((error) => error.msg);
    return res.status(400).json({ errors: errorMessages });
  }
  const user = req.body;

  //Hash password and save username and password to db here
  user.password = bcryptjs.hashSync(user.password);

  // Set the status to 201 Created and end the response.
  // return res.status(201).end();
  User.create(user)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    });
};

exports.signin = (req, res) => {
 
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("ERROR INSIDE CONTROLLER");
    const errorMessages = errors.array().map((error) => error.msg);
    return res.status(400).json({ errors: errorMessages });
  }
  const user = req.body;


  User.findAll({
    where: {
      username: user.username,
    },
  })
  .then((resp) => {
    console.log("FIND RES", resp.length);
    if (resp.length == 0) {
      res.status(400).send({ message: "User not found" });
      return;
    }

    const passwordIsValid = bcryptjs.compareSync(
      req.body.password,
      resp[0].dataValues.password
    );

    console.log("passwordisVALID", passwordIsValid);
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign({ id: resp.id }, secret, {
      expiresIn: 1200, // 20 minutes
    });

    res.status(200).send({
      id: user._id,
      username: user.username,
      email: resp[0].dataValues.email,
      accessToken: token,
    });
  });
};
