const { validationResult } = require("express-validator");
const debtSchema = require("../utils/validatorsDebt");
const debtService = require("../services/debtService");

exports.debts = [
  async (req, res) => {
    try {
      const debts = await debtService.debts();
      return res.status(200).json(debts);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Ops, query error. Try later." });
    }
  },
];

exports.debt = [
  async (req, res) => {
    try {
      const debtId = req.params.id;

      if (isNaN(debtId)) {
        return res.status(400).json("Invalid debt ID.");
      }

      const debt = await debtService.debt(debtId);
      if (!debt) {
        return res.status(404).json({ message: "Debt not found." });
      }
      return res.json(debt);
    } catch (error) {
      return res.status(500).json({ message: "Ops, query error. Try later." });
    }
  },
];

// exports.allDebts = [
//   async (req, res) => {
//     res.status(200).json("all-Bebts");
//   },
// ];

// exports.createDebt = [
//   debtSchema,

//   async (req, res) => {
//     const errorsValidation = validationResult(req);

//     if (!errorsValidation.isEmpty()) {
//       return res.status(400).json({ message: errorsValidation.array()[0].msg });
//     }

//     // VERIFICAR SE EXISTE ALGUM USUÁRIO COM O ID INFORMADO ::: STAND BY
//     const verifyUserExistWithId = verifyUserExistWithId(req.body.userId);

//     try {
//       const debt = await authService.createDebt(req.body);
//       res.status(201).json({ message: "Debt created successfully.", debt });
//     } catch (error) {
//       res.status(400).json({ message: error.message });
//     }
//   },
// ];
