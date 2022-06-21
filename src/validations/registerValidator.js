const {body} = require("express-validator")
const {getUsers} = require("../data")
const db = require("../database/models")

const validateRegister = [
    body("name")
        .notEmpty().withMessage("Ingrese un nombre").bail()
        .isLength({min:2}).withMessage("Ingrese un nombre válido"),
    body("lastname")
        .notEmpty().withMessage("Ingrese un nombre").bail()
        .isLength({min:2}).withMessage("Ingrese un nombre valido"),
    body("email")
        .notEmpty().withMessage("Ingrese un email").bail()
        .isEmail().withMessage("Ingrese un mail válido"),
    body("email").custom(value =>{
        return db.User.findOne({
            where:{
                email:value
            }
        })
        .then((user)=>{
            if(user){
            return Promise.reject("Email ya registrado")
        }
        })
    }),
    body("passwd")
        .notEmpty().withMessage("Ingrese una contraseña").bail()
        .isLength({min:8}).withMessage("La contraseña debe tener minimo 8 caracteres."),
    body("captcha")
        .isString("on").withMessage("Acepte el captcha"),
    body("terCondi")
        .isString("on").withMessage("Acepte terminos y condiciones"),
]

module.exports = validateRegister