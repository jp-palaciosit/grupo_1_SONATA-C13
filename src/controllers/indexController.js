/* const { get } = require("express/lib/request") */
const {getProducts} = require("../data")

module.exports = {
    index:(req, res) => {
        res.render("generalFolder/principal")
    },
    home:(req, res) => {
        res.render("generalFolder/home",{
            producto:getProducts
        })
    },
    details:(req, res) =>{
        let reqPar = +req.params.id
        let idProducto = getProducts.find(buscoId => buscoId.id === reqPar)
        res.render("products/productDetail",{
            title: idProducto.name,
            producto: idProducto
        })
    }
}