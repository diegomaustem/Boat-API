const { body } = require("express-validator");

const paymentBodySchema = [
  body("users_id")
    .notEmpty()
    .withMessage("The field userId cannot be empty.")
    .isNumeric()
    .withMessage("Just numbers for userId."),
  body("debts_id")
    .notEmpty()
    .withMessage("The field debtId cannot be empty.")
    .isNumeric()
    .withMessage("Just numbers for debtId."),
  body("price")
    .notEmpty()
    .withMessage("The field price cannot be empty.")
    .isNumeric()
    .withMessage("Just numbers for price."),
  body("status")
    .notEmpty()
    .withMessage("The field status cannot be empty.")
    .isString()
    .withMessage("Just letters.")
    .isLength({ min: 3 })
    .withMessage("At least 3 characters are required for the status."),
];

module.exports = paymentBodySchema;
