const express = require("express")
const router = express.Router()
const adminController = require("../controllers/admin/adminController")
const adminProductController = require("../controllers/admin/adminProductController")

/* Get - index */
router.get("/", adminController.index)

/* CRUD  PRODUCTS*/

// Get - lista productos
router.get("/productos", adminProductController.list)

/* router.get("/productos", adminProductController.productAdd)

router.get("/productos", adminProductController.list)

router.get("/productos", adminProductController.productCreate)

router.get("/productos", adminProductController.productEdit)

router.get("/productos", adminProductController.list)

router.get("/productos", adminProductController.list) */



module.exports = router;