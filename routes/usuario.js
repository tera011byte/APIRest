//rutas para usuario
const express = require("express");
const userController = require("./../controllers/usuarioController");
const router = express.Router();
const validateToken = require("../middlewares/auth.js");

// api/users
router.post("/", userController.createUsuario);
router.get("/", validateToken, userController.obtenerUsuarios);
router.put("/:id", userController.actualizarUsuario);
router.delete("/:id", userController.cambiarEstadoUsuario);

module.exports = router;
