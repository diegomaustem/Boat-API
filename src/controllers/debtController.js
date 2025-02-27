const { validationResult } = require("express-validator");
const debtSchema = require("../utils/validatorsDebt");
const debtService = require("../services/debtService");
const userService = require("../services/userService");

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

exports.registerDebt = [
  debtSchema,
  async (req, res) => {
    const errorsValidation = validationResult(req);
    const userId = req.body.userId;

    if (!errorsValidation.isEmpty()) {
      return res.status(400).json({ message: errorsValidation.array()[0].msg });
    }

    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID." });
    }

    const verifyUserExist = await verifyUserExistWithId(userId);

    if (verifyUserExist) {
      try {
        const debt = await debtService.registerDebt(req.body);
        res.status(201).json({ message: "Debt created successfully.", debt });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    } else {
      return res
        .status(400)
        .json({ message: "No users registered with this ID." });
    }
  },
];

exports.debtUpdate = [
  debtSchema,
  async (req, res) => {
    const debtId = parseInt(req.params.id);
    const debtData = req.body;
    const userIdDebt = req.body.userId;

    if (isNaN(debtId)) {
      return res.status(400).json({ message: "Invalid debt ID." });
    }

    try {
      const debtExist = await verifyDebtExist(debtId);
      if (!debtExist) {
        return res.status(404).json({ message: "Debt not found for update." });
      }

      const userIdExistDebt = await getDebtForUser(userIdDebt);
      if (!userIdExistDebt) {
        return res
          .status(404)
          .json({ message: "User id not found for update debt." });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error verifying debt existence." });
    }

    const errorsValidation = validationResult(req);
    if (!errorsValidation.isEmpty()) {
      return res.status(400).json({ message: errorsValidation.array()[0].msg });
    }

    try {
      const debtUpdated = await debtService.debtUpdate(debtId, debtData);
      res
        .status(200)
        .json({ message: "Debt updated successfully.", debtUpdated });
    } catch (error) {
      res.status(500).json({ message: "Error updating debt." });
    }
  },
];

async function verifyUserExistWithId(userId) {
  try {
    const userExist = await userService.user(userId);
    return !!userExist;
  } catch (error) {
    console.error("Error in verifyUserExist:", error);
    throw error;
  }
}

async function verifyDebtExist(debtId) {
  try {
    const debtExist = await debtService.debt(debtId);
    return !!debtExist;
  } catch (error) {
    throw error;
  }
}

async function getDebtForUser(userIdDebt) {
  try {
    const debtOfUserId = await debtService.getDebtForUser(userIdDebt);
    return debtOfUserId.length > 0;
  } catch (error) {
    throw error;
  }
}
