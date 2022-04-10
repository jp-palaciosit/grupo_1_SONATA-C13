const express = require("express")
const router = express.Router()
const productController = require("../controllers/productController")

/* router.get("/", productController.getAll) */
router.get("/detalle", productController.getOne)
router.get("/carrito", productController.carrito)


module.exports = router