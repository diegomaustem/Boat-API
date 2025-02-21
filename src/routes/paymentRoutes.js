const express = require("express");
const router = express.Router();

const paymentController = require("../controllers/paymentController");

router.get("/payments", paymentController.payments);
// router.post("/makePayment", paymentController.makePayment);

module.exports = router;
