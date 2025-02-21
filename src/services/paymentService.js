const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.getAllPayments = async () => {
  try {
    const payments = await prisma.payment.findMany();
    return payments;
  } catch (error) {
  } finally {
    await prisma.$disconnect();
  }
};
