const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

exports.users = async () => {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    throw error;
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
  }
};

exports.userUpdate = async (userId, userData) => {
  let hashedPassword;

  if (userData.password) {
    hashedPassword = await bcrypt.hash(userData.password, 10);
  }
  try {
    const userUpdated = await prisma.user.update({
      where: { id: userId },
      data: {
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
      },
    });
    return userUpdated;
  } catch (error) {
    throw error;
  }
};

exports.userDelete = async (userId) => {
  try {
    const userDeleted = await prisma.user.delete({
      where: { id: userId },
    });
    return userDeleted;
  } catch (error) {
    throw error;
  }
};
