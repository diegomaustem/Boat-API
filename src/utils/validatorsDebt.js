const { body } = require("express-validator");

const debtSchema = [
  body("userId")
    .notEmpty()
    .withMessage("The field userID cannot be empty.")
    .isNumeric()
    .withMessage("Just numbers for field userID."),
  body("title")
    .notEmpty()
    .withMessage("The field name cannot be empty.")
    .isString()
    .withMessage("Just letters.")
    .isLength({ min: 3 })
    .withMessage("At least 3 characters are required for the title."),
  body("value")
    .notEmpty()
    .withMessage("The field value cannot be empty.")
    .isNumeric()
    .withMessage("Just numbers for value."),
  body("description")
    .notEmpty()
    .withMessage("The field description cannot be empty."),
  body("status")
    .notEmpty()
    .withMessage("The field status cannot be empty.")
    .isString()
    .withMessage("Just characters for status."),
];

module.exports = debtSchema;
