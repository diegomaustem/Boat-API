const { validationResult } = require("express-validator");
const debtSchema = require("../utils/validatorsDebt");
const authService = require("../services/debtService");

exports.allDebts = [
  async (req, res) => {
    res.status(200).json("all-Bebts");
  },
];

exports.createDebt = [
  debtSchema,

  async (req, res) => {
    const errorsValidation = validationResult(req);

    if (!errorsValidation.isEmpty()) {
      return res.status(400).json({ message: errorsValidation.array()[0].msg });
    }

    // VERIFICAR SE EXISTE ALGUM USUÁRIO COM O ID INFORMADO ::: STAND BY
    const verifyUserExistWithId = verifyUserExistWithId(req.body.userId);

    try {
      const debt = await authService.createDebt(req.body);
      res.status(201).json({ message: "Debt created successfully.", debt });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
];
