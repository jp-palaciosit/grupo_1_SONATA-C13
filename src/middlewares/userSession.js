const userSession  = (req, res, next) =>{
    if(req.session.userActive){
        next()
    }
    else{
        res.redirect("/usuario/login")
    }
}
module.exports = userSession