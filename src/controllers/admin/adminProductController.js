/* const {getProducts, writeProducts} = require("../../data") */
const {validationResult} = require("express-validator")
/* const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
} */
const db = require("../../database/models")

module.exports = {
    list:(req,res)=>{
        db.Producto.findAll(
            {include:[{association:'Category'}]}
        )
        .then((producto)=>{
            res.render("admin/products/listaProductos", {
                title:"Lista de productos",
                productos: producto,
                session:req.session
            })
        })
        .catch((error)=>{
            res.send(error)
        }) 
        },
        productAdd:(req,res)=>{
            db.Category.findAll()
            .then(categories => {
                res.render("admin/products/addProduct",{
                    title: "Agregar productos",
                    session:req.session,
                    categories
                })
            })
    },
    productCreate:(req,res)=>{
        let errors = validationResult(req);
        /* if(errors.isEmpty()){ */
            db.Producto.create({
               
                name: req.body.name,
                price: req.body.price,
                discount:req.body.discount,
                description: req.body.description,
                id_categoria: req.body.id_categoria,
                shipment:req.body.shipment ? true : false,
                stock: req.body.stock ? true : false,
                image : req.file ? req.file.filename : "default-image.png"
            })
            .then((product) => {
                res.redirect("/admin")
            })
            .catch((error) => res.send(error))
            /* } 
            else{
                res.render("admin/products/addProduct", { 
                      titulo: "Agregar producto",
                      errors: errors.mapped(),
                      old: req.body,
                      session:req.session,
             })
            } */
        },
        
    productEdit:(req,res)=>{
        let idProducto = +req.params.id
        db.Producto.findByPk(idProducto)
        .then((producto)=>{
        res.render("admin/products/editProduct",{
            title: "Editar producto",
            producto,
            session:req.session
            })
        })
        .catch((error) => {
            res.send(error)
         })
    },  
    productUpdate:(req,res)=>{
        // 1- Obtener el id del producto
        let idProducto = +req.params.id 

        db.Producto.update({
            name: req.body.name,
            price: req.body.price,
            discount:req.body.discount,
            description: req.body.description,
            id_categoria: req.body.id_categoria,
            shipment:req.body.shipment ? true : false,
            stock: req.body.stock ? true : false,
            image : req.file ? req.file.filename : "default-image.png"
        },
        {
            where:{
                id:idProducto
            }
        }
        )
        .then((result) => {
            if(result){
                res.redirect("/admin/products")
            }else{
                res.send("Hay un error")
            }
        })
        .catch((error)=>{res.send(error)})
    },
    productDelete:(req,res)=>{
        db.Producto.destroy({
            where:{
                id:req.params.id
            }
        })
        .then((result)=>{
            if(result){
                res.redirect("/admin/products")
            }
            else{
                res.send("No se logro eliminar el producto.")
            }
        })
        .catch(error=>res.send(error))
    },
    /* search: (req, res) => {
        let searchResult = req.query.search;
        let search = searchResult.toLowerCase()
        db.Producto.findAll({
            where:{
                name:{[Op.like]:`%${search}%`}
            }
        })
        .then(producto=>{

            res.render("admin/products/resultsSearch",{
                titulo: `resultados de ${searchResult}`,
                producto,
                searchResult:producto,
                toThousand,
                session: req.session
             })
        })
        .catch((error)=>{res.send(error)})
    } */
}