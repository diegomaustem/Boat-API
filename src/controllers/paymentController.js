const { validationResult } = require("express-validator");
const paymentSchema = require("../utils/validatorsPayment");
const paymentService = require("../services/paymentService");
const debtService = require("../services/debtService");
const userService = require("../services/userService");

exports.payment = [
  async (req, res) => {
    try {
      const paymentId = req.params.id;

      if (isNaN(paymentId)) {
        return res.status(400).json("Invalid payment ID.");
      }

      const payment = await paymentService.payment(paymentId);

      if (!payment) {
        return res.status(404).json({ message: "Payment not found." });
      }
      return res.json(payment);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Ops, query payment error. Try later." });
    }
  },
];

exports.payments = [
  async (req, res) => {
    try {
      const payments = await paymentService.payments();
      res.status(200).json(payments);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
];

exports.registerPayment = [
  paymentSchema,

  async (req, res) => {
    const errorsValidation = validationResult(req);
    const userId = req.body.userId;
    const debtId = req.body.debtId;

    if (!errorsValidation.isEmpty()) {
      return res.status(400).json({ message: errorsValidation.array()[0].msg });
    }

    try {
      const verifyUserExist = await verifyUserExistWithId(userId);
      if (!verifyUserExist) {
        return res.status(400).json({ message: "Not found user ID." });
      }

      const verifyDebtExist = await verifyDebtExistWithId(debtId);
      if (!verifyDebtExist) {
        return res.status(400).json({ message: "Not found debt ID." });
      }

      const payment = await paymentService.registerPayment(req.body);
      res
        .status(201)
        .json({ message: "Payment entered successfully.", payment });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
];

async function verifyUserExistWithId(userId) {
  try {
    const userExist = await userService.user(userId);
    return !!userExist;
  } catch (error) {
    throw error;
  }
}

async function verifyDebtExistWithId(debtId) {
  try {
    const debtExist = await debtService.debt(debtId);
    return !!debtExist;
  } catch (error) {
    throw error;
  }
}
