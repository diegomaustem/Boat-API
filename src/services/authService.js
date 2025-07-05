const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

exports.registerUser = async (userData) => {
  try {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const hashedSecretCode = await bcrypt.hash(userData.secret_code, 12);

    return await prisma.users.create({
      data: {
        ...userData,
        password: hashedPassword,
        secret_code: hashedSecretCode,
      },
    });
  } catch (error) {
    console.error("Error creating user.", error);
    throw error;
  }
};

exports.loginUser = async (loginData) => {
  try {
    const user = await prisma.users.findUnique({
      where: { email: loginData.email },
    });

    const isMatch = await bcrypt.compare(loginData.password, user.password);

    if (!isMatch) {
      const error = new Error("Incorrect password.");
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return { user, token };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
