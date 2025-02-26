const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.users = async () => {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

exports.user = async (userId) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
    });
    return user;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
