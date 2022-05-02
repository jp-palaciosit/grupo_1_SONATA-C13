
const { get } = require("express/lib/response")
const {getProducts} = require("../data")

/* Para poner los puntos cada 3 cifras/miles */
const thousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")

/* Para remover los acentos */
const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}
 
module.exports = {
    index:(req, res) => {
        res.render("generalFolder/principal")
    },
    home:(req, res) => {
        res.render("generalFolder/home",{
            producto:getProducts,
            thousand
        })
    },
    details:(req, res) =>{
        let reqPar = +req.params.id
        let idProducto = getProducts.find(buscoId => buscoId.id === reqPar)
        res.render("products/productDetail",{
            title: idProducto.name,
            producto: idProducto,
            thousand
        })
    },
    search:(req, res)=>{
        /* Capturar lo que ingresa en la url(dsp de ?keywords=guitarra), en este caso aparece "keywords" porque asi es el name del input */

        let keyword = req.query.keywords.toLowerCase() //Hay que ponerle toLowerCase() porque el usuario puede ingresar el nombre en mayusculas como no.

        // Si se usa filter() el producto tiene que ser exacto, el metodo find() te devuelve el primero, ES POR ESO QUE SE HACE UN forEach para recorrer el array de productos, buscando el parametro.name que tenga incluido el resultado de req.query.keywords: ASI

        let searchResult = []
        getProducts.forEach(producto => {
            if(removeAccents(producto.name.toLowerCase()).includes(req.query.keywords.toLowerCase())){
                searchResult.push(producto)
            }

        });
        res.render("generalFolder/search",{
            searchResult,
            keyword: req.query.keywords,
            thousand
        } )

        
    }
}