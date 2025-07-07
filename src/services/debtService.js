const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getDebts = async () => {
  try {
    return await prisma.debts.findMany();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.getDebt = async (debtId) => {
  try {
    return await prisma.debts.findUnique({
      where: { id: debtId },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.registerDebt = async (debtData) => {
  try {
    return await prisma.debts.create({
      data: { ...debtData },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.updateDebt = async (debtId, debtData) => {
  try {
    return await prisma.debts.update({
      where: { id: debtId },
      data: {
        ...debtData,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

exports.deleteDebt = async (debtId) => {
  try {
    return await prisma.debts.delete({
      where: { id: debtId },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.getDebtForUser = async (userId) => {
  try {
    return await prisma.debts.findMany({
      where: { users_id: userId },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
