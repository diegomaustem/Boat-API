const { param } = require("express-validator");

const userParamSchema = [
  param("id").isNumeric().withMessage("Only numbers for parameter id."),
];

module.exports = userParamSchema;
