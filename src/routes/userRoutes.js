const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.get("/users", userController.users);
router.get("/user/:id", userController.user);
router.patch("/user-update/:id", userController.userUpdate);
router.delete("/user-delete/:id", userController.userDelete);

module.exports = router;
