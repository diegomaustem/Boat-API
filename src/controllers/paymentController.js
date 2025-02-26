const { validationResult } = require("express-validator");
const paymentSchema = require("../utils/validatorsPayment");
const paymentService = require("../services/paymentService");

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
