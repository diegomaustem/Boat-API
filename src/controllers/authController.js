const { validationResult } = require("express-validator");
const { registerSchema, loginSchema } = require("../utils/validatorsAuth");
const authService = require("../services/authService");

exports.register = [
  registerSchema,
  async (req, res) => {
    const errorsValidation = validationResult(req);

    if (!errorsValidation.isEmpty()) {
      res.status(400).json({
        code: 400,
        status: "error",
        message: errorsValidation.array()[0].msg,
      });
      return;
    }

    try {
      const user = await authService.registerUser(req.body);
      res.status(201).json({
        code: 201,
        status: "success",
        message: "User registered successfully.",
        user,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({
        code: 500,
        status: "error",
        message: "Internal error creating user. Please try again later.",
      });
    }
  },
];

exports.login = [
  loginSchema,

  async (req, res) => {
    const errorsValidation = validationResult(req);

    if (!errorsValidation.isEmpty()) {
      return res.status(400).json({ message: errorsValidation.array()[0].msg });
    }

    try {
      const { user, token } = await authService.loginUser(
        req.body.email,
        req.body.password
      );
      res.status(200).json({ user, token });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
];
