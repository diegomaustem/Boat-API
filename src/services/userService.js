const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

exports.getUsers = async () => {
  try {
    return await prisma.users.findMany();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.getUser = async (userId) => {
  try {
    return await prisma.users.findUnique({
      where: { id: userId },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.updateUser = async (userId, userData) => {
  if (userData.password) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;
  }

  try {
    return await prisma.users.update({
      where: { id: userId },
      data: { ...userData },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.deleteUser = async (userId) => {
  try {
    return await prisma.users.delete({
      where: { id: userId },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
