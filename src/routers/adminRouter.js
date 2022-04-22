const express = require("express")
const router = express.Router()
/* const methodOverrise */
const adminController = require("../controllers/admin/adminController")
const adminProductController = require("../controllers/admin/adminProductController")


// Get - index
router.get("/", adminController.index)

router.get("/producto/:id", adminController.product)

/* CRUD  PRODUCTS*/

// Get - Lista productos
router.get("/products", adminProductController.list)

// Get - Agregar producto (Pero no los crea)
router.get("/products/create", adminProductController.productAdd)

// Post - Crear un producto en DB
router.post("/products", adminProductController.productCreate)


// Get - Editar producto

router.get("/products/edit/:id", adminProductController.productEdit)

//Put - actualizar producto

router.put("/products/:id", adminProductController.productUpdate)



module.exports = router;