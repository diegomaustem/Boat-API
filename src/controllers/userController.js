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

exports.user = [
  async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await userService.user(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
      return res.json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Ops, query error. Try later." });
    }
  },
];
