const {check, body} = require("express-validator")
const {getProducts} = require("../data")

const validateAddProduct = [
    check("name")
        .notEmpty().withMessage("Ingrese un nombre del producto").bail()
        .isAlphanumeric().withMessage("Ingrese un nombre valido")
        .isLength({mind:6}).withMessage("El nombre tiene que tener al menos 6 caracteres"),
    check("price")
        .notEmpty().withMessage("Ingrese precio del producto").bail()
        .isNumeric().withMessage("Solo numeros"),
    check("discount").custom(value=>{
        if(value >= 0 && value <= 100){
            return true
        }
        return false
    }).withMessage("El descuento tiene que ser un valor entre 0 y 100"),
    check("categoryId")
        .notEmpty().withMessage("Seleccione una categoria"),
    check("stock")
        .isString("on").withMessage("Seleccione stock"),
    check("shipment")
        .isString("on").withMessage("Seleccione modo de envio")
]

module.exports = validateAddProduct