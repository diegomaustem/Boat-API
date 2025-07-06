const express = require("express");
const router = express.Router();

const paymentController = require("../controllers/paymentController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/payments", paymentController.getPayments);
router.get("/payment/:id", paymentController.getPayment);
router.post("/payment", paymentController.registerPayment);
router.put("/payment/:id", paymentController.updatePayment);
router.delete("/payment/:id", paymentController.deletePayment);

module.exports = router;
