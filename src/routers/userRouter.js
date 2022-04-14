const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")

/* ruta login */
router.get("/", userController.login)

/* ruta register */
router.get("/registro", userController.register)

/* ruta registrado */

router.get("/registro/correctamente", userController.registrado)

/* ruta recuperar passwd */

router.get("/olvide-mi-passwd", userController.recPasswd)
module.exports = router