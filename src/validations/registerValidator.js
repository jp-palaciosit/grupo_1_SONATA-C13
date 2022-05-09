const {check, body} = require("express-validator")
const {getUsers} = require("../data")

const validateRegister = [
    check("name")
        .notEmpty().withMessage("Ingrese un nombre").bail()
        .isLength({min:2}).withMessage("Ingrese un nombre válido"),
    check("lastname")
        .notEmpty().withMessage("Ingrese un nombre").bail()
        .isLength({min:2}).withMessage("Ingrese un nombre valido"),
    check("email")
        .notEmpty().withMessage("Ingrese un email").bail()
        .isEmail().withMessage("Ingrese un mail válido"),
    body("email").custom(value =>{
        let usuarios = getUsers.find(user => user.email === value)
        if(usuarios){
            return false
        }
        return true
    }).withMessage("Email ya registrado"),
    check("passwd")
        .notEmpty().withMessage("Ingrese una contraseña").bail()
        .isLength({min:8}).withMessage("La contraseña debe tener minimo 8 caracteres."),
    check("captcha")
        .isString("on").withMessage("Acepte el captcha"),
    check("terCondi")
        .isString("on").withMessage("Acepte terminos y condiciones"),
]

module.exports = validateRegister