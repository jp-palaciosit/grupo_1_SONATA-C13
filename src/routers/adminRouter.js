const express = require("express")
const router = express.Router()
const adminController = require("../controllers/admin/adminController")
const adminProductController = require("../controllers/admin/adminProductController")

// Get - index
router.get("/", adminController.index)

/* CRUD  PRODUCTS*/

// Get - Lista productos
router.get("/productos", adminProductController.list)

// Get - Agregar producto (Pero no los crea)
router.get("/productos/agregar", adminProductController.productAdd)

// Post - Crear un producto en DB
router.post("/productos", adminProductController.productCreate)


/*

router.get("/productos", adminProductController.productEdit)

router.get("/productos", adminProductController.list)

router.get("/productos", adminProductController.list) */



module.exports = router;