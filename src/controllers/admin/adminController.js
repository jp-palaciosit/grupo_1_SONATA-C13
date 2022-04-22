const {getProducts} = require("../../data")


module.exports = {
    index: (req, res)=>{
        res.render("admin/adminIndex", {
            title: "adminIndex"
        })
    },
    /* product:(req, res)=>{
        res.render("products/productDetail", {
            title: "Detalle de producto"
        })
    } */
}