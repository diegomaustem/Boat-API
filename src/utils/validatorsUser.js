const { param, body } = require("express-validator");

const userSchema = [
  param("id").isNumeric().withMessage("Only numbers for parameter id."),
  body("name")
    .notEmpty()
    .withMessage("The field name cannot be empty.")
    .isString()
    .withMessage("Just letters in the name field.")
    .isLength({ min: 3 })
    .withMessage("At least 3 characters are required for the name."),
  body("email")
    .notEmpty()
    .withMessage("The field email cannot be empty.")
    .isEmail()
    .withMessage("Invalid email."),
  body("password")
    .notEmpty()
    .withMessage("The field password cannot be empty.")
    .isString()
    .withMessage("String is required in the password field.")
    .isLength({ min: 6 })
    .withMessage("At least 6 characters are required for the password."),
];

module.exports = userSchema;
