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

exports.payments = async () => {
  try {
    const payments = await prisma.payment.findMany();
    return payments;
  } catch (error) {
    throw error;
  }
};

exports.registerPayment = async (paymentData) => {
  try {
    const payment = await prisma.payment.create({
      data: {
        userId: paymentData.userId,
        price: paymentData.price,
        status: paymentData.status,
      },
    });
    return payment;
  } catch (error) {
    throw error;
  }
};
