const userInSession = (req, res, next) => {
    if(req.session.userActive){
        return res.redirect("/home")
    }
    next()
    }
    
    module.exports = userInSession