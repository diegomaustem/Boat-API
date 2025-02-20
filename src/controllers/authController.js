const { validationResult } = require("express-validator");
const { registerSchema } = require("../utils/validators");

const users = [];

exports.register = [
  registerSchema,

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const newUser = req.body;
    users.push(newUser);

    res
      .status(201)
      .json({ message: "User registered successfully!", user: users });
  },
];
