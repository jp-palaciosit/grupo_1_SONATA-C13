const express = require("express")
const app = express()
const path = require("path")
const PORT = 3030
const pathResolve = path.resolve(__dirname, "./public")

app.use(express.static(pathResolve))

app.listen(PORT, ()=>console.log(`Servidor corriendo en el puerto ${PORT}`))

app.get("/", (req,res)=>{
    res.sendFile(path.resolve(__dirname, "./views/index.html"))
})