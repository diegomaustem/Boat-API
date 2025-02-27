const express = require("express");
const router = express.Router();

const paymentController = require("../controllers/paymentController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/payments", paymentController.payments);
router.get("/payment/:id", paymentController.payment);
router.post("/payment", paymentController.registerPayment);

module.exports = router;
