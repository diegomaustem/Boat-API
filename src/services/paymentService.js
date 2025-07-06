const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getPayment = async (id) => {
  try {
    return await prisma.payments.findUnique({
      where: { id: id },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.getPayments = async () => {
  try {
    return await prisma.payments.findMany();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.registerPayment = async (paymentData) => {
  try {
    const payment = await prisma.payment.create({
      data: {
        userId: paymentData.userId,
        debtId: paymentData.debtId,
        price: paymentData.price,
        status: paymentData.status,
      },
    });
    return payment;
  } catch (error) {
    throw error;
  }
};

exports.paymentUpdate = async (paymentId, paymentData) => {
  try {
    const paymentUpdated = await prisma.payment.update({
      where: { id: paymentId },
      data: {
        userId: paymentData.userId,
        debtId: paymentData.debtId,
        price: paymentData.price,
        status: paymentData.status,
      },
    });
    return paymentUpdated;
  } catch (error) {
    throw error;
  }
};

exports.paymentDelete = async (paymentId) => {
  try {
    const paymentDeleted = await prisma.payment.delete({
      where: { id: paymentId },
    });
    return paymentDeleted;
  } catch (error) {
    throw error;
  }
};
