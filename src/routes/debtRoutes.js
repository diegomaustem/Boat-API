const express = require("express");
const router = express.Router();
const debtController = require("../controllers/debtController");

router.get("/debts", debtController.getDebts);
router.get("/debt/:id", debtController.getDebt);
router.post("/debt", debtController.registerDebt);
router.put("/debt/:id", debtController.updateDebt);
router.delete("/debt/:id", debtController.deleteDebt);

module.exports = router;
