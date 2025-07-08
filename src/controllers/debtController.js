const { validationResult } = require("express-validator");
const debtBodySchema = require("../utils/validatorsDebt/debtBodyValidation");
const debtParamSchema = require("../utils/validatorsDebt/debtParamValidation");
const debtService = require("../services/debtService");
const userService = require("../services/userService");
const paymentService = require("../services/paymentService");

exports.getDebts = [
  async (req, res) => {
    try {
      const debts = await debtService.getDebts();
      return res
        .status(200)
        .json({ code: 200, status: "success", debts: debts });
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

exports.getDebt = [
  debtParamSchema,
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
      const debtId = parseInt(req.params.id);

      const debt = await debtService.getDebt(debtId);
      if (!debt) {
        return res
          .status(404)
          .json({ code: 404, status: "error", message: "Debt not found." });
      }
      return res.status(200).json({ code: 200, status: "success", debt: debt });
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

exports.registerDebt = [
  debtBodySchema,
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
      const userId = parseInt(req.body.users_id);
      const user = await userService.getUser(userId);

      if (!user) {
        res.status(404).json({
          code: 404,
          status: "error",
          message: "The debit cannot be linked to the selected user.",
        });
        return;
      }

      const debt = await debtService.registerDebt(req.body);
      return res.status(201).json({
        code: 201,
        status: "success",
        message: "Debt created successfully.",
        debt: debt,
      });
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

exports.updateDebt = [
  debtParamSchema,
  debtBodySchema,
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
      const debtId = parseInt(req.params.id);
      const userId = parseInt(req.body.users_id);

      const debt = await debtService.getDebt(debtId);
      if (!debt) {
        return res.status(404).json({
          code: 404,
          status: "error",
          message: "Debt not found for update.",
        });
      }

      const user = await userService.getUser(userId);
      if (!user) {
        return res.status(404).json({
          code: 404,
          status: "error",
          message: "User id not found for update debt.",
        });
      }

      const debtUpdated = await debtService.updateDebt(debtId, req.body);
      return res.status(200).json({
        code: 200,
        status: "success",
        message: "Debt updated successfully.",
        debtUpdated: debtUpdated,
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

exports.deleteDebt = [
  debtParamSchema,
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
      const debtId = parseInt(req.params.id);

      const debt = await debtService.getDebt(debtId);
      if (!debt) {
        return res.status(404).json({
          code: 404,
          status: "error",
          message: "Debt not found for delete.",
        });
      }

      const debtHasPayments = await paymentService.getDebtHasPayments(debtId);
      if (debtHasPayments) {
        return res.status(404).json({
          code: 400,
          status: "error",
          message:
            "There is a payment conditional on the debit. Exclusion denied.",
        });
      }

      const debtDeleted = await debtService.deleteDebt(debtId);
      return res.status(200).json({
        code: 200,
        status: "success",
        message: "Debt deleted successfully.",
        debtDeleted,
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
