const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")
const uploadFile = require("../middlewares/uploadAvatar")
const registerValidator = require("../validations/registerValidator")
const loginValidator = require("../validations/loginValidator")
const userInSession = require("../middlewares/userInSession")

/* GET- ruta login */
router.get("/login", userInSession, userController.login)

/* POST - ruta login */
router.post("/login", loginValidator, userController.loginProcess)

/* GET - ruta register */
router.get("/registro", userInSession, userController.register)

/* GET - ruta registrado */

router.get("/registro/correctamente", userInSession, userController.registrado)

/* GET - ruta recuperar passwd */

router.get("/olvide-mi-passwd",  userInSession, userController.recPasswd)


/* POST - Ruta crear nuevo registro de usuario*/

router.post("/registro", uploadFile.single("avatar"), registerValidator, registerValidator ,userController.processRegister)

/* GET - Cerrar sesion */

router.get("/logout", userController.logOut)

module.exports = router