const { registerSchema } = require("../utils/validators");

exports.register = async (req, res) => {
  res.status(201).json("Arrived");
};
