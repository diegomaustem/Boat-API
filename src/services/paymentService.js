const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getPayments = async () => {
  try {
    return await prisma.payments.findMany();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.getPayment = async (paymentId) => {
  try {
    return await prisma.payments.findUnique({
      where: { id: paymentId },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.registerPayment = async (paymentData) => {
  try {
    return await prisma.payments.create({
      data: {
        ...paymentData,
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.updatePayament = async (paymentId, paymentData) => {
  try {
    return await prisma.payments.update({
      where: { id: paymentId },
      data: {
        ...paymentData,
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.deletePayment = async (paymentId) => {
  try {
    return await prisma.payments.delete({
      where: { id: paymentId },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
