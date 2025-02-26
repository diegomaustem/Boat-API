const express = require("express");
const router = express.Router();

const paymentController = require("../controllers/paymentController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/payment/:id", paymentController.payment);
router.get("/payments", paymentController.payments);
router.post("/makePayment", authMiddleware, paymentController.makePayment);

module.exports = router;
