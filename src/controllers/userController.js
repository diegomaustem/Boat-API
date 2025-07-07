const { validationResult } = require("express-validator");
const userParamSchema = require("../utils/validationsUser/userParamValidation");
const userBodySchema = require("../utils/validationsUser/userBodyValidation");
const userService = require("../services/userService");
const debtService = require("../services/debtService");

exports.getUsers = [
  async (req, res) => {
    try {
      const users = await userService.getUsers();
      res.status(200).json({ code: 200, status: "success", users: users });
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

exports.getUser = [
  userParamSchema,
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
      const userId = parseInt(req.params.id);
      const user = await userService.getUser(userId);

      if (!user) {
        res
          .status(404)
          .json({ code: 404, status: "error", message: "User not found." });
        return;
      }
      return res.status(200).json({ code: 200, status: "success", user: user });
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

exports.updateUser = [
  ...userParamSchema,
  ...userBodySchema,
  async (req, res) => {
    const errorsValidation = validationResult(req);
    if (!errorsValidation.isEmpty()) {
      return res.status(400).json({
        code: 400,
        status: "error",
        message: errorsValidation.array()[0].msg,
      });
    }

    const userId = parseInt(req.params.id);
    const userData = req.body;

    try {
      const userExist = await userService.getUser(userId);
      if (!userExist) {
        return res.status(404).json({
          code: 404,
          status: "error",
          message: "User not found for update.",
        });
      }

      const userUpdated = await userService.updateUser(userId, userData);
      return res.status(200).json({
        code: 200,
        status: "success",
        message: "User updated successfully.",
        userUpdated: userUpdated,
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

exports.deleteUser = [
  userParamSchema,
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
      const userId = parseInt(req.params.id);
      const userExist = await userService.getUser(userId);
      if (!userExist) {
        return res.status(404).json({
          code: 404,
          status: "error",
          message: "User not found for delete.",
        });
      }

      const userHasDebt = await verifyUserHasDebt(userId);
      if (userHasDebt) {
        return res.status(403).json({
          code: 403,
          status: "error",
          message: "User cannot be deleted due to outstanding debts.",
        });
      }

      const userDeleted = await userService.deleteUser(userId);
      return res.status(200).json({
        code: 200,
        status: "success",
        message: "User deleted successfully.",
        userDeleted: userDeleted,
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

async function verifyUserHasDebt(userId) {
  try {
    const debtOfUser = await debtService.getDebtForUser(userId);
    return debtOfUser.length > 0;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
