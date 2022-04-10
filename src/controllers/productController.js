
module.exports = {
    /* getAll: (req, res) => {
        res.set({'content-type':'text/plain;charset=utf-8'})
        res.render() 
    },    */ 
    getOne: (req,res)=>{
        res.render("products/productDetail")
    },
    carrito: (req, res)=>{
        res.render("products/productCart")
    }

}

