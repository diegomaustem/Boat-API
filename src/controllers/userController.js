const userService = require("../services/userService");

exports.users = [
  async (req, res) => {
    try {
      const users = await userService.users();
      return res.status(200).json(users);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Ops, query error. Try later." });
    }
  },
];
