const {body} = require("express-validator")
/* const {getUsers} = require("../data") */
const db = require("../database/models")
const path = require("path")

const validateRegister = [
    body("name")
        .notEmpty().withMessage("Ingrese su nombre").bail()
        .isLength({min:2}).withMessage("Ingrese un nombre válido"),
    body("lastName")
        .notEmpty().withMessage("Ingrese su apellido").bail()
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
    body("avatar").custom((value, {req}) => {
        let file = req.file
        let extensionesPermitidas = ["jpg","jpeg","png", "gif"];
            if(!file){
                return Promise.reject("Subir un avatar")
            }
            let extensionOriginal = req.file.mimetype.split("/").pop()
            if(!extensionesPermitidas.includes(extensionOriginal)){
                throw new Error(`Las extensiones permitidas son ${extensionesPermitidas.join(', ')}`)
            }
            return true;
        }),
    body("captcha")
        .isString("on").withMessage("Acepte el captcha"),
    body("terCondi")
        .isString("on").withMessage("Acepte terminos y condiciones"),
]

module.exports = validateRegister