const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.userDebts = async (id) => {
  try {
    const debts = await prisma.debt.find({ where: { id } });
    return debts;
  } catch (error) {}
};

exports.createDebt = async (debtData) => {
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
};
