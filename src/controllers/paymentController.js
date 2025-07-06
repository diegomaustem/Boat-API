const { validationResult } = require("express-validator");
const paymentSchema = require("../utils/validatorsPayment");
const paymentService = require("../services/paymentService");
const debtService = require("../services/debtService");
const userService = require("../services/userService");
const kafkaService = require("../services/kafkaService");
const { Kafka } = require("kafkajs");

exports.getPayments = [
  async (req, res) => {
    try {
      const payments = await paymentService.getPayments();
      return res
        .status(200)
        .json({ code: 200, status: "success", payments: payments });
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        code: 400,
        status: "error",
        message: "Internal error. Please try again later.",
      });
    }
  },
];

exports.getPayment = [
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
      if (payment) {
        await registerPaymentOfKafka(payment);
      }
      res
        .status(201)
        .json({ message: "Payment entered successfully.", payment });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
];

exports.updatePayment = [
  paymentSchema,
  async (req, res) => {
    const errorsValidation = validationResult(req);
    const paymentId = parseInt(req.params.id);
    const userId = req.body.userId;
    const debtId = req.body.debtId;
    const paymentData = req.body;

    if (isNaN(paymentId)) {
      return res.status(400).json({ message: "Invalid payment ID." });
    }

    if (!errorsValidation.isEmpty()) {
      return res.status(400).json({ message: errorsValidation.array()[0].msg });
    }

    try {
      const verifyPaymentIdExist = await verifyPaymentExistWithId(paymentId);
      if (!verifyPaymentIdExist) {
        return res
          .status(404)
          .json({ message: "Payment not found for update." });
      }

      const verifyUserExist = await verifyUserExistWithId(userId);
      if (!verifyUserExist) {
        return res.status(400).json({ message: "Not found user ID." });
      }

      const verifyDebtExist = await verifyDebtExistWithId(debtId);
      if (!verifyDebtExist) {
        return res.status(400).json({ message: "Not found debt ID." });
      }

      const paymentUpdated = await paymentService.paymentUpdate(
        paymentId,
        paymentData
      );
      if (paymentUpdated) {
        res
          .status(200)
          .json({ message: "Payment updated successfully.", paymentUpdated });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error updating payment." });
    }
  },
];

exports.deletePayment = [
  async (req, res) => {
    const paymentId = parseInt(req.params.id);

    if (isNaN(paymentId)) {
      return res.status(400).json({ message: "Invalid payment ID." });
    }

    try {
      const paymentExist = await verifyPaymentExistWithId(paymentId);
      if (!paymentExist) {
        return res
          .status(404)
          .json({ message: "Payment not found for deleted." });
      }

      const paymentDeleted = await paymentService.paymentDelete(paymentId);
      res
        .status(200)
        .json({ message: "Payment deleted successfully.", paymentDeleted });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error verifying payment existence." });
    }
  },
];

async function verifyPaymentExistWithId(paymentId) {
  try {
    const paymentExist = await paymentService.payment(paymentId);
    return !!paymentExist;
  } catch (error) {
    throw error;
  }
}

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

async function registerPaymentOfKafka(payment) {
  const clientId = "producer-boat";
  const brokers = "localhost:9093";

  const kafka = new Kafka({
    clientId: clientId,
    brokers: [brokers],
  });

  const producer = kafka.producer();
  kafkaService.run(payment, producer);
}
