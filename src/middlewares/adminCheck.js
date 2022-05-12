const adminCheck = (req, res, next)=>{
    if(req.session.userActive.rol === "ADMIN"){
        next()
    }
    else{
        res.send("No tienes permiso para ingresar")
    }
}
module.exports = adminCheck