const { validationResult } = require("express-validator");
const userSchema = require("../utils/validatorsUser");
const userService = require("../services/userService");
const debtService = require("../services/debtService");
const { verify } = require("jsonwebtoken");

exports.users = [
  async (req, res) => {
    try {
      const users = await userService.users();
      return res.status(200).json(users);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Ops, query error. Try later." });
    }
  },
];

exports.user = [
  async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await userService.user(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
      return res.json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Ops, query error. Try later." });
    }
  },
];

exports.userUpdate = [
  userSchema,
  async (req, res) => {
    const userId = parseInt(req.params.id);
    const userData = req.body;

    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID." });
    }

    try {
      const userExist = await verifyUserExist(userId);
      if (!userExist) {
        return res.status(404).json({ message: "User not found for update." });
      }
    } catch (error) {
      console.error("Error verifying user existence:", error);
      return res
        .status(500)
        .json({ message: "Error verifying user existence." });
    }

    const errorsValidation = validationResult(req);
    if (!errorsValidation.isEmpty()) {
      return res.status(400).json({ message: errorsValidation.array()[0].msg });
    }

    try {
      const userUpdated = await userService.userUpdate(userId, userData);
      res
        .status(200)
        .json({ message: "User updated successfully.", userUpdated });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Error updating user." });
    }
  },
];

exports.userDelete = [
  async (req, res) => {
    const userId = parseInt(req.params.id);

    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID." });
    }

    try {
      // Verifica se o usuário existe
      const userExist = await verifyUserExist(userId);
      if (!userExist) {
        return res.status(404).json({ message: "User not found for deleted." });
      }

      // Verifica se o usuário tem dívidas
      const userHasDebt = await verifyUserHasDebt(userId);
      if (userHasDebt) {
        return res
          .status(403)
          .json({ message: "The user has debts and cannot be deleted." });
      }

      // Exclui o usuário
      const userDeleted = await userService.userDelete(userId);
      res
        .status(200)
        .json({ message: "User deleted successfully.", userDeleted });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error verifying user existence." });
    }
  },
];

async function verifyUserExist(userId) {
  try {
    const userExist = await userService.user(userId);
    return !!userExist;
  } catch (error) {
    console.error("Error in verifyUserExist:", error);
    throw error;
  }
}

async function verifyUserHasDebt(userId) {
  try {
    const debtOfUser = await debtService.getDebtForUser(userId);
    return debtOfUser.length > 0;
  } catch (error) {
    throw error;
  }
}
