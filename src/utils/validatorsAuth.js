const { body } = require("express-validator");

const registerSchema = [
  body("name")
    .notEmpty()
    .withMessage("The field name cannot be empty.")
    .isString()
    .withMessage("Just letters.")
    .isLength({ min: 3 })
    .withMessage("At least 3 characters are required for the name."),
  body("email")
    .notEmpty()
    .withMessage("The field email cannot be empty.")
    .isEmail()
    .withMessage("The email is invalid."),
  body("password")
    .notEmpty()
    .withMessage("The field password cannot be empty.")
    .isLength({ min: 6 })
    .withMessage("At least 6 characters are required for the password."),
];

const loginSchema = [
  body("email")
    .notEmpty()
    .withMessage("The field email cannot be empty.")
    .isLength({ min: 6 })
    .withMessage("At least 6 characters are required for the email.")
    .isEmail()
    .withMessage("The email is invalid."),
  body("password")
    .notEmpty()
    .withMessage("The field password cannot be empty.")
    .isLength({ min: 6 })
    .withMessage("At least 6 characters are required for the password."),
];

module.exports = { registerSchema, loginSchema };
