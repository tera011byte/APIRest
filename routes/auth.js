//rutas para autenticar
const express = require("express");
const authController = require("./../controllers/authController");
const router = express.Router();

// api/auth

router.post("/", authController.login);
router.get("/");
router.put("/:id");
router.delete("/:id");

module.exports = router;
