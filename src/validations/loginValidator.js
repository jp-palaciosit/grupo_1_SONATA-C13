const {check, body} = require("express-validator")
/* const {getUsers} = require("../data") */
const bcryptjs = require("bcryptjs")
const db = require("../database/models")

const validateLogin = [
    check("email")
        .notEmpty().withMessage("Ingrese un email").bail()
        .isEmail().withMessage("Ingrese un mail valido"),
    body("custom").custom((value, { req }) =>{
        return db.User.findOne({
            where: {
                email: req.body.email
            }
        })
        .then((user)=>{
        if(!bcryptjs.compareSync(req.body.passwd, user.passwd)){
            return Promise.reject();
        }
    })
    .catch(error =>{
        return Promise.reject("El email o contraseña es incorrecto")
    })
}),
    check("passwd")
        .notEmpty().withMessage("Ingrese una contraseña")
        .isLength({min:8, max:16}).withMessage("La contraseña debe tener entre 8 a 16 caracteres")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,16}$/, "i").withMessage("Contraseña incorrecta")
        
]

module.exports = validateLogin