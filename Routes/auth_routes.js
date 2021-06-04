"use strict";

const express = require("express");
const auth_controller = require("../controllers/auth_controller");
const { signUpValidator, signInValidator } = require("../Validators");
const { authJWT, verifySignUp } = require("../Middlewares");

// Construct a router instance.
const router = express.Router();

router.use
// Route that creates a new user.
router.post("/auth/signup", [signUpValidator, verifySignUp], auth_controller.signup);

router.post("/auth/login", signInValidator, auth_controller.signin);

module.exports = router;
