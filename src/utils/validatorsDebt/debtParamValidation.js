const { param } = require("express-validator");

const debtParamSchema = [
  param("id").isNumeric().withMessage("Only numbers for parameter id."),
];

module.exports = debtParamSchema;
