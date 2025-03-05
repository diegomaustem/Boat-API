const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

exports.registerUser = async (userData) => {
  try {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    let hashedSecretCode = "";

    if (userData.secretCode) {
      hashedSecretCode = await bcrypt.hash(userData.secretCode, 12);
    }

    const user = await prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
        secretCode: hashedSecretCode,
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
};

exports.loginUser = async (email, password) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Incorrect password");

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return { user, token };
  } catch (error) {
    throw error;
  }
};
