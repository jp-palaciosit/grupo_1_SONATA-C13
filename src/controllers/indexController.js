const {validationResult} = require("express-validator")
const db = require("../database/models")
const {Op} = db.Sequelize;

/* Para poner los puntos cada 3 cifras/miles */
const thousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")

/* Para remover los acentos */
const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}
 
module.exports = {
    index:(req, res) => {
        res.render("generalFolder/principal", {
            title: "Sonata",
            session: req.session
        })
    },
    home:(req,res)=>{
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
    details:(req, res) =>{
        let reqPar = +req.params.id

        db.Producto.findByPk({
            where: {
                id: reqPar
            },
            include: [{ association: "image"}]
        })
        .then((producto) => {
            res.render("products/productDetail", {
                titulo: "Detalle del producto",
                product:producto,
                session:req.session,
                thousand
            })
        })
        .catch((error) => { res.send(error)})        
    },
    search: (req, res) => {
        let searchResult = req.query.keywords;
        let search = searchResult.toLowerCase()
        db.Producto.findAll({
            where:{
                name:{[Op.like]:`%${search}%`}
            }
        })
        .then(producto=>{

            res.render("generalFolder/search",{
                titulo: `resultados de ${searchResult}`,
                producto,
                searchResult:producto, 
                thousand,
                session: req.session
             })
        })
        .catch((error)=>{
            res.send(error)
        })
    }
    
} 