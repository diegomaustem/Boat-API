const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.payment = async (id) => {
  try {
    const payment = await prisma.payment.findUnique({
      where: { id: Number(id) },
    });
    return payment;
  } catch (error) {
    throw error;
  }
};

exports.getAllPayments = async () => {
  try {
    const payments = await prisma.payment.findMany();
    return payments;
  } catch (error) {
  } finally {
    await prisma.$disconnect();
  }
};
