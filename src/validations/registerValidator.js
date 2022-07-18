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
        .isLength({min:8, max:16}).withMessage("La contraseña debe tener entre 8 a 16 caracteres")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,16}$/, "i"),
    body("avatar").custom((value, {req}) => {
        let file = req.file
        let extensionesPermitidas = ["jpg","jpeg","png", "gif"];
            if(!file){
                return true
            }
            /* let extensionOriginal = req.file.mimetype.split("/").pop() */
            if(!extensionesPermitidas.exec(req.file.filename)){
                return Promise.reject(`Las extensiones permitidas son ${extensionesPermitidas.join(', ')}`)
            }
            else{
                return true
            }
        }),
    body("captcha")
        .isString("on").withMessage("Acepte el captcha"),
    body("terCondi")
        .isString("on").withMessage("Acepte terminos y condiciones"),
]

module.exports = validateRegister