const {check, body} = require("express-validator")
/* const {getProducts} = require("../data") */

const validateAddProduct = [
    check("name")
        .notEmpty().withMessage("Ingrese un nombre del producto").bail()
        .isAlphanumeric().withMessage("Ingrese un nombre valido").bail()
        .isLength({min:5, max:40}).withMessage("El nombre tiene que tener al menos 5 caracteres"),
    check("price")
        .notEmpty().withMessage("Ingrese precio del producto").bail()
        .isNumeric().withMessage("Solo numeros"),
    check("discount").custom(value=>{
        if(value >= 0 && value <= 100){
            return true
        }
        return false
    }).withMessage("El descuento tiene que ser un valor entre 0 y 100"),
    check("id_categoria")
        .notEmpty().withMessage("Seleccione una categoria"),
    check("description")
    .notEmpty().withMessage("Ingrese una descripcion").bail()
    .isLength({min:20}).withMessage("La descripcion tiene que tener entre 20 a 100 caracteres."),
    check("stock")
        .isString("on").withMessage("Seleccione stock"),
    check("shipment")
        .isString("on").withMessage("Seleccione modo de envio"),
    check("image").custom((value, {req}) => {
        let file = req.file
        let extensionesPermitidas = /(.jpg|.jpeg|.png|.gif)$/i
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
        })
]

module.exports = validateAddProduct