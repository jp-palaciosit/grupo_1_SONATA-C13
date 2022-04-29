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
                image: req.file ? req.file.filename : "default-image.png" ,
                shipment: req.body.shipment ? true: false,
                stock: req.body.stock ? true: false
            }
           
        /* 2) Agregarlo al array correspondiente */
            getProducts.push(newProduct)
            
        /* 3) Escribir el array con el nuevo producto en el json */
        
            writeProducts(getProducts)
        
        /* 4) Devolver una vista(Redireccionar) correspondiente */

            res.redirect("/admin/products")
        },
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
    },
    /*productSearch:(req,res)=>{

    } */
}