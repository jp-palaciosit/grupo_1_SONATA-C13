/* const {getProducts, writeProducts} = require("../../data") */
const {validationResult} = require("express-validator")
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
        res.render("admin/products/addProduct",{
            title: "Agregar productos",
            session:req.session
        })
    },
    productCreate:(req,res)=>{
        let errors = validationResult(req);
        if(errors.isEmpty()){
            db.Producto.create({
               
                name: req.body.name,
                price: req.body.price,
                discount:req.body.discount,
                description: req.body.description,
                id_categoria: req.body.id_categoria,
                shipment:req.body.shipment ? true : false,
                stock: req.body.stock ? true : false
            })
                .then((product) => {
                    db.ProductImage.create({
                        imageName: req.file ? req.file.filename : "default-image.png",
                        id_producto: product.id
                    })
                        .then(() => {
                            res.redirect('/admin/products/listaProductos')
                        })
                        .catch((error) => res.send(error))
                })
                .catch((error) => res.send(error))

            }







/* 

           db.Producto.create({include:[{association:'Category'}], 
             ...req.body,
             stock: req.body.stock ? req.body.stock = 1 : req.body.stock = 0,
             shipment: req.body.shipment ? req.body.shipment = 1 : req.body.shipment = 0,
             image: req.file ? req.file.filename : "default-image.png"

          })
          
        .then(() => res.redirect('/admin/products/listaProductos'))

           .catch(error => res.send(error))
        }else{
          res.render('admin/products/addProduct', { 
            titulo: "Agregar producto",
            errors: errors.mapped(),
            old: req.body
           })
        }  */
       },











/* 
        let errors = validationResult(req)
        if(errors.isEmpty()){
             db.Producto.create(
                {include:[{association:'Category'}],
                 ...req.body,
                 image: req.file ? req.file.filename : "default-image.png" ,
                 shipment: req.body.shipment ? 1 : 0,
                 stock: req.body.stock ? req.body.stock = 1 : req.body.stock = 0
             })
             .then((result) => {
                res.redirect("/admin")
            })
            .catch((error) => {
            res.send(error)
            })
         
        }
        else{
            res.render("admin/products/addProduct",{
             title: "Agregar productos",
             errors: errors.mapped(),
             old: req.body
            })
        }    
    },*/
       
    productEdit:(req,res)=>{
        // 1- Obtener el id del producto

        let idProducto = +req.params.id

        // 2- Buscar el producto a editar
        let producto = getProducts.find(producto => producto.id === idProducto)
        
        // 3- Mostrar el producto en la vista
        res.render("admin/products/editProduct",{
            title: "Editar producto",
            producto
        })
    },  
    productUpdate:(req,res)=>{
        // 1- Obtener el id del producto
        let idProducto = +req.params.id 

        // 2 - Buscar el producto a editar y modificar el producto
        getProducts.forEach(producto => {
            if(producto.id === idProducto){
                // para modificar todos los valores del objeto
                producto.name = req.body.name
                producto.price = req.body.price
                producto.discount = req.body.discount
                producto.categoryId = req.body.categoryId
                producto.description = req.body.description
                producto.stock = req.body.stock ? true : false
                producto.shipment = req.body.shipment ? true : false
                producto.image = req.file ? req.file.filename : producto.image
            }
        });

        // 3- Guardar los cambios
        writeProducts(getProducts)

        // 4 - Respuesta
        res.redirect("/admin/products")
    },
    productDelete:(req,res)=>{
        //1 - Obtener el id del producto a eliminar
        let idProducto = +req.params.id
        //2 - Buscar el producto dentro del array y eliminarlo
        getProducts.forEach(product =>{
            if(product.id === idProducto){
                //obtener la ubicacion(indice del producto a enviar)
                let productDeleteIndex = getProducts.indexOf(product)
                //Elimino el producto del array
                getProducts.splice(productDeleteIndex, 1)
            }
        })
        //3 - Sobreescribir el json(guardar los cambios).
        writeProducts(getProducts)
        //4 - Enviar respuesta
        res.redirect("/admin/products")
    }
}