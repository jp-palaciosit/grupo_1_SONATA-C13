const {getProducts} = require("../data")
const { search } = require("../routers/productRouter")
const thousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")

module.exports = {
    detalle:(req, res) =>{
        let reqPar = +req.params.id
        let idProducto = getProducts.find(buscoId => buscoId.id === reqPar)
        res.render("products/productDetail",{
            title: idProducto.name,
            product: idProducto,
            thousand
        })
    }
  
}
    /* getOne: (req,res)=>{
        res.render("products/productDetail",{
            producto: getProducts
        })
    },
    carrito: (req, res)=>{
        res.render("products/productCart")
    }, */


