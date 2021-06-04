const { check } = require("express-validator");

const userSignUpValidator = [
 check("email").exists({ checkNull: true, checkFalsy: true })
 .withMessage('Please provide a value for email')
 .isEmail().normalizeEmail()
 .withMessage("Value must be a valid email")
 ,
  check("username")
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('Please provide a value for username'),
  check("password")
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage("Please provide a value for password")
    .isLength({min:6 , max: 20})
    .withMessage("Password must be min 6 characters and max of 20")
    .matches(/\d/)
    .withMessage("must constain a number"),
];

module.exports = userSignUpValidator;