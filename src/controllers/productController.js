/* const {getProducts} = require("../data") */
const thousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
const db = require("../database/models")
module.exports = {
    list:(req,res)=>{
        db.Producto.findAll()
        .then(productos=>{
            res.render("generalFolder/productDB",{
                session:req.session,
                product:productos,
                thousand
            })
        })
        .catch((error) => { res.send(error)})
    },
    detalle:(req, res) =>{
        let reqPar = +req.params.id

        db.Producto.findByPk(reqPar
           /*  where: {
                id: id_producto
            },
            include: [{ association: "image"}] */
        )
        .then((producto) => {
            res.render("products/productDetail", {
                titulo: "Detalle del producto",
                product:producto,
                session:req.session,
                thousand
            })
        })
        .catch((error) => { res.send(error)})        
    }
        /* let idProducto = getProducts.find(buscoId => buscoId.id === reqPar)
        res.render("products/productDetail",{
            title: idProducto.name,
            product: idProducto,
            thousand,
            session: req.session
        })
    } */
  
}


