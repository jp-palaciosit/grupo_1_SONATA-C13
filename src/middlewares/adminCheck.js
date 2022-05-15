const adminCheck = (req, res, next)=>{
    if(req.session.userActive.rol === "ADMIN"){
        next()
    }
    else{
        res.redirect("/admin/sinPermiso")
    }
}
module.exports = adminCheck