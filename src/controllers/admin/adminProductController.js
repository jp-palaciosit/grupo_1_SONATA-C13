const {getProducts} = require("../../data")

module.exports = {
    list:(req,res)=>{
        res.render("admin/products/listaProductos", {
            title:"Lista de productos",
            productos: getProducts
        })
    },
    productAdd:(req,res)=>{

    },
    productCreate:(req,res)=>{

    },
    productEdit:(req,res)=>{

    },
    productUpdate:(req,res)=>{

    },
    productDelete:(req,res)=>{

    },
    productSearch:(req,res)=>{

    }
}