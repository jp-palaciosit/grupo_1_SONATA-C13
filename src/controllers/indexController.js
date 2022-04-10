const {getProducts} = require("../data")

module.exports = {
    index:(req, res) => {
        res.render("generalFolder/principal")
    },
    home:(req, res) => {
        res.render("generalFolder/home",{
            product:getProducts
        })
    }
}