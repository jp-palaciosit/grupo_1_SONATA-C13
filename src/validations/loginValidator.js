const {check, body} = require("express-validator")
const {getUsers} = require("../data")
const BCRYPT = require("bcryptjs")
const bcryptjs = require("bcryptjs")

const validateLogin = [
    check("email")
        .notEmpty().withMessage("Ingrese un email").bail()
        .isEmail().withMessage("Ingrese un mail valido"),
    body("custom").custom((value, { req }) =>{
        let usuarios = getUsers.find(user => user.email === req.body.email)
        if(bcryptjs.compareSync(req.body.passwd, usuarios.passwd)){
            return true
        }
        return false
    }).withMessage("El email o contraseña es incorrecto"),
    check("passwd")
        .notEmpty().withMessage("Ingrese una contraseña")
]

module.exports = validateLogin