const {getProducts} = require("../../data")
const removeAccents = (str) => {return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")}

module.exports = {
    index: (req, res)=>{
        res.render("admin/adminIndex", {
            title: "adminIndex",
            session: req.session
        })
    },
    sinPermiso:(req,res)=>{
        res.render("admin/sinPermiso",{
            title:"Hola Profes",
            session: req.session
        })
    },
    search: (req, res)=>{
        let keyword = req.query.keywords.toLowerCase()
        let searchResult = []
        getProducts.forEach(producto => {
            if(removeAccents(producto.name).toLowerCase().includes(keyword)){
                searchResult.push(producto)
            }
        });
        res.render("admin/products/searchProduct",{
            searchResult,
            keyword: req.query.keywords,
            title: "Busqueda de producto"
        })

    }
    
}