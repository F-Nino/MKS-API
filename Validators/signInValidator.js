const { check } = require("express-validator");

const signInValidator = [
    check("username")
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('Please provide a value for username'),
  check("password")
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage("Please provide a value for password")
    
]

module.exports = signInValidator;