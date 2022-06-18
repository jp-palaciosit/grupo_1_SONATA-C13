const {getProducts} = require("../data")
const { search } = require("../routers/productRouter")
const thousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
const db = require("../database/models")
module.exports = {
    list:(req,res)=>{
        db.Producto.findAll()
        .then(productos=>{
            res.send(productos)
        })
    },
    detalle:(req, res) =>{
        let reqPar = +req.params.id
        let idProducto = getProducts.find(buscoId => buscoId.id === reqPar)
        res.render("products/productDetail",{
            title: idProducto.name,
            product: idProducto,
            thousand,
            session: req.session
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


