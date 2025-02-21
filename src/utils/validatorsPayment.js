const { body } = require("express-validator");

const paymentSchema = [
  body("name")
    .notEmpty()
    .withMessage("The field name cannot be empty.")
    .isString()
    .withMessage("Just letters.")
    .isLength({ min: 3 })
    .withMessage("At least 3 characters are required for the name."),
  body("cpf")
    .notEmpty()
    .withMessage("The field cpf cannot be empty.")
    .isNumeric()
    .withMessage("Just numbers for cpf.")
    .isLength({ min: 11 })
    .withMessage("At least 11 numbers are required for the cpf."),
  body("card_number")
    .notEmpty()
    .withMessage("The field card number cannot be empty.")
    .isNumeric()
    .withMessage("Just numbers for card.")
    .isLength({ min: 16 })
    .withMessage("At least 16 numbers are required for the card number."),

  body("code_security")
    .notEmpty()
    .withMessage("The field code security cannot be empty.")
    .isNumeric()
    .withMessage("Just numbers for code security.")
    .isLength({ min: 3 })
    .withMessage("At least 3 numbers are required for the code security."),

  body("value")
    .notEmpty()
    .withMessage("The field value cannot be empty.")
    .isNumeric()
    .withMessage("Just numbers for value."),
];

module.exports = paymentSchema;
