const express = require("express")
const router = express.Router()
/* const methodOverrise */
const adminController = require("../controllers/admin/adminController")
const adminProductController = require("../controllers/admin/adminProductController")
const uploadFile = require("../middlewares/uploadProductImg")
const validateAddProduct = require("../validations/adminAddProduct")
const userSession = require("../middlewares/userSession")
const adminCheck = require("../middlewares/admincheck")

// Get - index
router.get("/", userSession, adminCheck, adminController.index)

router.get("/search", userSession, adminCheck, adminController.search)

/* router.get("/producto/:id", adminController.product) */

/* CRUD  PRODUCTS*/

// Get - Lista productos
router.get("/products", userSession, adminCheck, adminProductController.list)

// Get - Agregar producto (Pero no los crea)
router.get("/products/create", userSession, adminCheck, adminProductController.productAdd)

// Post - Crear un producto en DB
router.post("/products", uploadFile.single("image"), validateAddProduct ,adminProductController.productCreate)


// Get - Editar producto

router.get("/products/edit/:id", userSession, adminCheck, adminProductController.productEdit)

//Put - actualizar producto

router.put("/products/:id", uploadFile.single("image"), adminProductController.productUpdate)

router.delete("/products/eliminar/:id", adminProductController.productDelete)


module.exports = router;