const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const debtController = require("../controllers/debtController");

// ROTA RETORNA TODOS AS DÍVIDAS DO USUÁRIO LOGADO :::

// router.get("/allDebts", debtController.allDebts);
// router.post("/createDebt", debtController.createDebt);

router.get("/debts", debtController.debts);
router.get("/debt/:id", debtController.debt);
// router.post("/debt", debtController.registerDebt);
// router.put("/debt-update/:id", debtController.debtUpdate);
// router.delete("/debt-delete/:id", debtController.debtDelete);

module.exports = router;
