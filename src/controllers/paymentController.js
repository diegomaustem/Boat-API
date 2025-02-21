const { validationResult } = require("express-validator");
const paymentSchema = require("../utils/validatorsPayment");
const paymentService = require("../services/paymentService");

exports.getAllPayments = [
  async (req, res) => {
    try {
      const payments = await paymentService.getAllPayments();
      res.status(200).json(payments);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
];

exports.makePayment = [
  paymentSchema,

  async (req, res) => {
    const errorsValidation = validationResult(req);

    if (!errorsValidation.isEmpty()) {
      return res
        .status(400)
        .json({ message: errorsValidation.array()[0].message });
    }

    try {
      const payment = await paymentService.makePayment(req.body);
      res
        .status(201)
        .json({ message: "Payment entered successfully.", payment });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
];
