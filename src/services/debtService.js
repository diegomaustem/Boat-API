const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.debts = async () => {
  try {
    const debts = await prisma.debt.findMany();
    return debts;
  } catch (error) {
    throw error;
  }
};

exports.debt = async (debtId) => {
  try {
    const debt = await prisma.debt.findUnique({
      where: { id: Number(debtId) },
    });
    return debt;
  } catch (error) {
    throw error;
  }
};

exports.registerDebt = async (debtData) => {
  try {
    const debt = await prisma.debt.create({
      data: {
        userId: debtData.userId,
        title: debtData.title,
        value: debtData.value,
        description: debtData.description,
        status: debtData.status,
      },
    });
    return debt;
  } catch (error) {
    throw error;
  }
};

exports.debtUpdate = async (debtId, debtData) => {
  try {
    const debtUpdated = await prisma.debt.update({
      where: { id: debtId },
      data: {
        userId: debtData.userId,
        title: debtData.title,
        value: debtData.value,
        description: debtData.description,
        status: debtData.status,
      },
    });
    return debtUpdated;
  } catch (error) {
    throw error;
  }
};

exports.debtDelete = async (debtId) => {
  try {
    const debtDeleted = await prisma.debt.delete({
      where: { id: debtId },
    });
    return debtDeleted;
  } catch (error) {
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
