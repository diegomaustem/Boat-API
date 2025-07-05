const { body } = require("express-validator");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

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
    .withMessage("The email is invalid.")
    .custom(async (value) => {
      const existingUser = await prisma.users.findUnique({
        where: {
          email: value,
        },
      });
      if (existingUser) {
        throw new Error("This email is already registered.");
      }
      return true;
    }),
  body("password")
    .notEmpty()
    .withMessage("The field password cannot be empty.")
    .isLength({ min: 6 })
    .withMessage("At least 6 characters are required for the password."),
  body("secret_code")
    .optional({ checkFalsy: true })
    .isNumeric()
    .withMessage("Just numbers.")
    .isLength({ min: 3 })
    .withMessage("At least 3 numbers are required for the secret code."),
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
