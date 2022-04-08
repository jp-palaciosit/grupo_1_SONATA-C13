const express = require("express")
const app = express()
const path = require("path")
const process =  require("process")
/* se tiene que instalar el dotenv: npm install dotenv */
require('dotenv').config()
const PORT = process.env.PORT || 3000
const pathResolve = path.join(__dirname, "./public")

app.use(express.static(pathResolve))

app.listen(PORT, ()=>console.log(`Servidor corriendo en el puerto ${PORT}`))

/* Views cofings */
app.set("view engine", "ejs")

/* Buscador de views */
app.set("views", path.join(__dirname, "views"))  




app.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname, "./views/principal.html"))
})

app.get("/index", (req,res)=>{
    res.sendFile(path.join(__dirname, "./views/index.html"))
})

app.get("/home", (req,res)=>{
    res.sendFile(path.join(__dirname, "./views/index.html"))
})

app.get("/productDetail", (req,res)=>{
    res.sendFile(path.join(__dirname, "./views/productDetail.html"))
})
app.get("/login", (req,res)=>{
    res.sendFile(path.join(__dirname, "./views/login.html"))
 })
 
app.get("/recuperarcontra", (req,res)=>{
    res.sendFile(path.join(__dirname, "./views/recuperarcontra.html"))
})

app.get("/datosUser", (req,res)=>{
    res.sendFile(path.join(__dirname, "./views/datosUser.html"))
})

app.get("/register", (req,res)=>{
    res.sendFile(path.join(__dirname, "./views/register.html"))
})

app.get("/productCart", (req,res)=>{
    res.sendFile(path.join(__dirname, "./views/productCart.html"))
})