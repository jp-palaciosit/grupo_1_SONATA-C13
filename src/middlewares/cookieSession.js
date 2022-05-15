const cookieSesion = (req, res, next)=>{
    if(req.cookies.CookieSonata){
        req.session.userActive = req.cookies.CookieSonata
        res.locals.user = req.session.userActive
    }
    next()    
}

module.exports = cookieSesion