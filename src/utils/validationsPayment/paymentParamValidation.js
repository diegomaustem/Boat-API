const { param } = require("express-validator");

const paymentParamSchema = [
  param("id").isNumeric().withMessage("Only numbers for parameter id."),
];

module.exports = paymentParamSchema;
