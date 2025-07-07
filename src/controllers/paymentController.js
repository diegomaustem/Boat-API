const { validationResult } = require("express-validator");
const paymentBodySchema = require("../utils/validationsPayment/paymentBodyValidation");
const paymentParamSchema = require("../utils/validationsPayment/paymentParamValidation");
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
      return res.status(500).json({
        code: 500,
        status: "error",
        message: "Internal error. Please try again later.",
      });
    }
  },
];

exports.getPayment = [
  paymentParamSchema,
  async (req, res) => {
    const errorsValidation = validationResult(req);
    if (!errorsValidation.isEmpty()) {
      return res.status(400).json({
        code: 400,
        status: "error",
        message: errorsValidation.array()[0].msg,
      });
    }

    try {
      const paymentId = parseInt(req.params.id);
      const payment = await paymentService.getPayment(paymentId);

      if (!payment) {
        return res.status(404).json({
          code: 404,
          status: "error",
          message: "Payment not found.",
        });
      }

      return res
        .status(200)
        .json({ code: 200, status: "success", payament: payment });
    } catch (error) {
      return res.status(500).json({
        code: 500,
        status: "error",
        message: "An internal error has occurred. Try later.",
      });
    }
  },
];

exports.registerPayment = [
  paymentBodySchema,
  async (req, res) => {
    const errorsValidation = validationResult(req);
    if (!errorsValidation.isEmpty()) {
      return res.status(400).json({
        code: 400,
        status: "error",
        message: errorsValidation.array()[0].msg,
      });
    }

    try {
      const userId = parseInt(req.body.userId);
      const debtId = parseInt(req.body.debtId);

      const verifyUserExist = await userService.getUser(userId);
      if (!verifyUserExist) {
        return res.status(400).json({
          code: 400,
          status: "error",
          message: "The user id provided is not valid.",
        });
      }

      const verifyDebtExist = await debtService.debt(debtId);
      if (!verifyDebtExist) {
        return res.status(400).json({
          code: 400,
          status: "error",
          message: "The debt id provided is not valid.",
        });
      }

      const payment = await paymentService.registerPayment(req.body);
      // if (payment) { await registerPaymentOfKafka(payment);}
      return res.status(201).json({
        code: 201,
        status: "success",
        message: "Payment entered successfully.",
        payment,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        code: 500,
        status: "error",
        message: "An internal error has occurred. Try later.",
      });
    }
  },
];

exports.updatePayment = [
  paymentBodySchema,
  paymentParamSchema,
  async (req, res) => {
    const errorsValidation = validationResult(req);
    if (!errorsValidation.isEmpty()) {
      return res.status(400).json({
        code: 400,
        status: "error",
        message: errorsValidation.array()[0].msg,
      });
    }

    try {
      const userId = parseInt(req.body.userId);
      const debtId = parseInt(req.body.debtId);
      const paymentId = parseInt(req.params.id);

      const payment = await paymentService.getPayment(paymentId);
      if (!payment) {
        return res.status(404).json({
          code: 404,
          status: "error",
          message: "Payment not found for update.",
        });
      }

      const user = await userService.getUser(userId);
      if (!user) {
        return res.status(404).json({
          code: 404,
          status: "error",
          message: "User/Payment ID not found.",
        });
      }

      const debt = await debtService.getDebt(debtId);
      if (!debt) {
        return res.status(404).json({
          code: 404,
          status: "error",
          message: "Debt/Payment ID not found.",
        });
      }

      const paymentUpdated = await paymentService.updatePayament(
        paymentId,
        req.body
      );

      return res.status(200).json({
        code: 200,
        status: "success",
        message: "Payment updated successfully.",
        paymentUpdated: paymentUpdated,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        code: 500,
        status: "error",
        message: "An internal error has occurred. Try later.",
      });
    }
  },
];

exports.deletePayment = [
  paymentParamSchema,
  async (req, res) => {
    const errorsValidation = validationResult(req);
    if (!errorsValidation.isEmpty()) {
      return res.status(400).json({
        code: 400,
        status: "error",
        message: errorsValidation.array()[0].msg,
      });
    }

    try {
      const paymentId = parseInt(req.params.id);

      const paymentExist = await paymentService.getPayment(paymentId);
      if (!paymentExist) {
        return res.status(404).json({
          code: 404,
          status: "error",
          message: "Payment not found for deleted.",
        });
      }

      const paymentDeleted = await paymentService.deletePayment(paymentId);
      return res.status(200).json({
        code: 200,
        status: "success",
        message: "Payment deleted successfully.",
        paymentDeleted: paymentDeleted,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        code: 500,
        status: "error",
        message: "An internal error has occurred. Try later.",
      });
    }
  },
];

// async function registerPaymentOfKafka(payment) {
//   const clientId = "producer-boat";
//   const brokers = "localhost:9093";

//   const kafka = new Kafka({
//     clientId: clientId,
//     brokers: [brokers],
//   });

//   const producer = kafka.producer();
//   kafkaService.run(payment, producer);
// }
