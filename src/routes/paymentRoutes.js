const express = require("express");
const router = express.Router();

const paymentController = require("../controllers/paymentController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/payments", paymentController.payments);
router.get("/payment/:id", paymentController.payment);
router.post("/payment", paymentController.registerPayment);
router.put("/payment-update/:id", paymentController.paymentUpdate);
router.delete("/payment-delete/:id", paymentController.paymentDelete);

module.exports = router;
