const fs = require("fs")
const path = require("path")

module.exports = {
    getProducts : JSON.parse(fs.readFileSync(path.join(__dirname, "/product.json"), "utf-8")),
    /* Metodo para leer el .json */
    getUsers: JSON.parse(fs.readFileSync(path.join(__dirname, "/users.json"), "utf-8")),
    /* Metodo para escribir el .json */
    writeUsers: (data) =>{ fs.writeFileSync(path.join(__dirname, "/users.json"), JSON.stringify(data))}

}
