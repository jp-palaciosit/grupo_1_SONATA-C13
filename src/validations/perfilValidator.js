/* const {check, body} = require("express-validator")
const bcryptjs = require("bcryptjs")
const db = require("../database/models")

const validatorPerfil = [
    check("name")
        .notEmpty().withMessage('Se require nombre completo'),
    check("lastName")
        .notEmpty().withMessage('Se require nombre completo'),
    check("phone")
        .notEmpty().withMessage('Se require nombre completo'),
    check("postCode")
        .notEmpty().withMessage('Se require nombre completo'),
    check("province")
        .notEmpty().withMessage('Se require nombre completo'),
    check("direction")
        .notEmpty().withMessage('Se require nombre completo'),
    check("number")
        .notEmpty().withMessage('Se require nombre completo')
];

module.exports = validatorPerfil  */