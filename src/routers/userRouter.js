const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")
const uploadFile = require("../middlewares/uploadAvatar")

/* GET- ruta login */
router.get("/", userController.login)

/* GET - ruta register */
router.get("/registro", userController.register)

/* GET - ruta registrado */

router.get("/registro/correctamente", userController.registrado)

/* GET - ruta recuperar passwd */

router.get("/olvide-mi-passwd", userController.recPasswd)


/* POST - Ruta crear nuevo registro de usuario*/

router.post("/registro", uploadFile.single("avatar") ,userController.processRegister)

module.exports = router