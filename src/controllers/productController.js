const {getProducts} = require("../data")

module.exports = {
    /* getAll: (req, res) => {
        res.set({'content-type':'text/plain;charset=utf-8'})
        res.render() 
    },    */ 
    detalle:(req, res) =>{
        let reqPar = +req.params.id
        let idProducto = getProducts.find(buscoId => buscoId.id === reqPar)
        res.render("products/productDetail",{
            title: idProducto.name,
            product: idProducto
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


