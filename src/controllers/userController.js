/* const {getUsers, writeUsers} = require("../data") */
const {validationResult} = require("express-validator")
const BCRYPT = require("bcryptjs")
const db = require("../database/models")
const {Op} = db.Sequelize;
/* const sequelize = db.sequelize */


module.exports = {
    login: (req, res)=>{
        res.render("users/login",{
            title:"Login",
            session: req.session
        })
    },
    perfilUser:(req,res)=>{
        res.render("users/perfilUser",{
            title:"Perfil",
            session: req.session
        })
    },
    //Simulacion de logeo
    loginProcess:(req, res)=>{
        let errors = validationResult(req)
        if(errors.isEmpty()){
            db.User.findOne({
                where: {
                    email: req.body.email
                }
            })
                .then((user)=>{
                   req.session.userActive = {
                    id: user.id,
                    name: user.name,
                    lastName: user.lastName,
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
        })
        .catch(error => console.log(error))
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
            /* {include:[{association:'Rol'}]} */
            db.User.create({
                ...req.body,
                passwd: BCRYPT.hashSync(req.body.passwd, 10),
                terminosCoindiciones: req.body.terCondi,
                avatar: req.file ? req.file.filename : "default-image.png",
                rol: "USER"
            })
            .then((user) => {
                res.redirect("/usuario/login")
            })
            .catch(error => res.send(error))
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

    }, 


   /*  perfil:(req,res)=>{
        
        db.User.findByPk(
            req.params.id,{
        })
        .then((user) => {
            res.render("users/perfilUser2",{
                    titulo:`Perfil`,
                    session: req.session,
                    user
                })
        })
        .catch((error) => { res.render(error)})

    } */
    /* 
    perfil : (req, res)=>{
        let id = +req.session.userActive.id;
        db.User.findOne({
            where: {
                id
            },
        })
        .then((user) => {
            res.render("users/perfilUser2", {
                title: `Perfilde ${user.name}`,
                user,
                session: req.session,
                old: req.body
            })
        })
        .catch(error => res.send(error))
    },
    perfilEdit :(req, res)=>{
        let errors = validationResult(req)
        db.User.findByPk(req.params.id)
        .then((user) => {
            ,
            }, {
                where: {
                    id: user.address_id
                }
            })
            .then((address) => {
                db.users.update({
                    name: req.body.name,
                    surname: req.body.surname,
                    email: req.body.email,
                    rol: req.body.rol,
                    avatar: req.file ? req.file.filename : user.avatar,
                    // address_id: address.id
                },{
                    where: {
                        id: req.params.id
                    }
                })
                .then(() =>{
                    res.redirect('/admin/users')
                })
                .catch((error) => { console.log(error)})
                
            })
                .catch((error) => { console.log(error)})
        })
        .catch((error) => { res.send(error)})
    }
},

    },
    perfilActualizado: (req, res) => {
        let errors = validationResult(req);
        if(errors.isEmpty()){
            db.User.update({
                ...req.body,
                avatar: req.file ? req.file.filename : req.session.userActive.image 
            },{
                where: {
                    id: req.session.userActive.id
                }
            })
            .then(() => res.redirect('/'))
            .catch(error => res.send(error))
        }else{
            db.User.findOne({
                where: {
                    id: req.session.userActive.id
                }
            })
            .then(() => {
                res.render('users/perfilEdit', {
                    title: "Editar Perfil",
                    session: req.session,
                    old: req.body,
                    errors: errors.mapped()
                }) 
            })
        }
    }, */

}