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
]

module.exports = validateLogin