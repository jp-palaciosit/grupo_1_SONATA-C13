const {getProducts, writeProducts} = require("../../data")

module.exports = {
    list:(req,res)=>{
        res.render("admin/products/listaProductos", {
            title:"Lista de productos",
            productos: getProducts
        })
    },
    productAdd:(req,res)=>{
        res.render("admin/products/addProduct",{
            title: "Agregar productos"
        })
    },
    productCreate:(req,res)=>{
        /* 1) Crear el objeto producto */
            let lastId = 0
            getProducts.forEach(product => {
                if(product.id > lastId){
                    lastId = product.id
                }
            });

            let newProduct = {
                ...req.body,
                id: lastId +1,
                shipment: req.body.shipment ? true: false,
                stock: req.body.stock ? true: false
            }
           
        /* 2) Agregarlo al array correspondiente */
            getProducts.push(newProduct)
            
        /* 3) Escribir el array con el nuevo producto en el json */
        
            writeProducts(getProducts)
        
        /* 4) Devolver una vista(Redireccionar) correspondiente */

            res.redirect("/admin/productos")
        }
    /* productEdit:(req,res)=>{

    },
    productUpdate:(req,res)=>{

    },
    productDelete:(req,res)=>{

    },
    productSearch:(req,res)=>{

    } */
}