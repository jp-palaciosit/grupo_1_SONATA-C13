const {getUsers, writeUsers} = require("../data")
const {validationResult} = require("express-validator")
const BCRYPT = require("bcryptjs")

module.exports = {
    login: (req, res)=>{
        res.render("users/login",{
            title:"Login",
            session: req.session
        })
    },
    //Simulacion de logeo
    loginProcess:(req, res)=>{
        let errors = validationResult(req)
        if(errors.isEmpty()){
           let user = getUsers.find(user => user.email === req.body.email)
             
           req.session.userActive = {
               id: user.id,
               name: user.name,
               email: user.email,
               avatar: user.avatar,
               rol: user.rol
           }
            if(req.body.captcha){  
                const TIMECOOKIE = 60000
                res.cookie("CookieSonata", req.session.userActive,{
                    expires: new Date(Date.now() + TIMECOOKIE),
                    httpOnly: true,
                    secure: true
                })
            }
            res.locals.user = req.session.userActive

            res.redirect("/home")
        }
        else{
            res.render("users/login",{
                title:"Login",
                errors: errors.mapped(),
                session: req.session
            })
        }
    },
    register: (req, res)=>{
        res.render("users/register", {
            title: "Register",
            session: req.session
        })

    },
    recPasswd: (req, res)=>{
        res.render("users/recuperarContra",{
            title:"Rec_Passwd",
            session: req.session
        })
    },
    registrado:(req, res)=>{
        res.render("users/datosUser",{
            title: "Gracias",
            session: req.session
        })
    },
    processRegister: (req, res) =>{
        //verificar si hay error en el form
        let errors = validationResult(req)
        
        if(errors.isEmpty()){ 
            let lastId = 0
            getUsers.forEach(user => {
                if(user.id > lastId){
                    lastId = user.id
                }
            });
            let newUser = {
                id: lastId + 1,
                name: req.body.name,
                lastName: req.body.lastname,
                email: req.body.email,
                passwd: BCRYPT.hashSync(req.body.passwd, 10),
                captcha: req.body.captcha,
                terminosCoindiciones: req.body.terCondi,
                avatar: req.file ? req.file.filename : "default-image.png",
                rol: "USER"
            }
            getUsers.push(newUser)
            writeUsers(getUsers)

            res.redirect("/usuario/login")

        }
        else{
            res.render("users/register",{
                titulo: "Register",
                errors: errors.mapped(),
                old: req.body,
                session: req.session
            })
        }
    },
    logOut:(req, res) => {
        req.session.destroy()
        if(req.cookies.CookieSonata){
            res.cookie("CookieSonata", "", {maxAge: -1})
        }
        res.redirect("/")
    }
    
}