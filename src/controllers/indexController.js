
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