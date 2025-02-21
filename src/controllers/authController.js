const { validationResult } = require("express-validator");
const { registerSchema, loginSchema } = require("../utils/validators");
const authService = require("../services/authService");

exports.register = [
  registerSchema,

  async (req, res) => {
    const errorsValidation = validationResult(req);

    if (!errorsValidation.isEmpty()) {
      return res
        .status(400)
        .json({ message: errorsValidation.array()[0].message });
    }

    try {
      const user = await authService.registerUser(req.body);
      res.status(201).json({ message: "User registered successfully.", user });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
];

exports.login = [
  loginSchema,

  async (req, res) => {
    const errorsValidation = validationResult(req);

    if (!errorsValidation.isEmpty()) {
      return res
        .status(400)
        .json({ message: errorsValidation.array()[0].message });
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
