const express = require("express");
const cors = require("cors");
const authRoutes = require("./src/routes/authRoutes");
const paymentRoutes = require("./src/routes/paymentRoutes");
const debtRoutes = require("./src/routes/debtRoutes");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api", paymentRoutes);
app.use("/api", debtRoutes);

module.exports = app;
