const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const debtController = require("../controllers/debtController");

// ROTA RETORNA TODOS AS DÍVIDAS DO USUÁRIO LOGADO :::

router.get("/allDebts", debtController.allDebts);
router.post("/createDebt", debtController.createDebt);

// router.post("/makeDebts", debtController.makePayment);

module.exports = router;
