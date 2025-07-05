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
      res.status(400).json({
        code: 400,
        status: "error",
        message: errorsValidation.array()[0].msg,
      });
      return;
    }

    try {
      const { user, token } = await authService.loginUser(req.body);
      res.status(200).json({ code: 200, status: "success", user, token });
    } catch (error) {
      const code = error.statusCode || 500;
      const message =
        code === 500
          ? "Internal error. Please try again later."
          : error.message;

      res.status(code).json({
        code: code,
        status: "error",
        message: message,
      });
    }
  },
];
