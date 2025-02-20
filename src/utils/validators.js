const express = require("express");
const { body, validationResult } = require("express-validator");
const app = express();

app.use(express.json());

const registerSchema = [
  body("name")
    .isString()
    .withMessage("Just letters.")
    .isLength({ min: 3 })
    .withMessage("At least 3 characters are required of name.")
    .notEmpty()
    .withMessage("The field name cannot be empty."),
  body("email")
    .notEmpty()
    .withMessage("The field email cannot be empty.")
    .isEmail()
    .withMessage("Email invalid."),
  body("password")
    .notEmpty()
    .withMessage("The field password cannot be empty.")
    .isLength({ min: 6 })
    .withMessage("At least 6 characters are required of password."),
];

module.exports = { registerSchema };
