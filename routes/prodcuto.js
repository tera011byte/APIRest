//rutas para producto
const express = require("express");
const productController = require("./../controllers/productoController");
const router = express.Router();

// api/productos

router.post("/", productController.createProducto);
router.get("/", productController.obtenerProductos);
router.put("/:id", productController.actualizarProductos);
router.get("/:id", productController.obtenerProducto);
router.delete("/:id", productController.eliminarProducto);

module.exports = router;
