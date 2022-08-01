/* const {getUsers, writeUsers} = require("../data") */
const {validationResult} = require("express-validator")
const BCRYPT = require("bcryptjs")
const db = require("../database/models")
const {Op} = db.Sequelize;
let fs = require('fs')
let path = require('path')
/* const sequelize = db.sequelize */


module.exports = {
    login: (req, res)=>{
        res.render("users/login",{
            title:"Login",
            session: req.session
        })
    },/* 
    perfilUser:(req,res)=>{
        res.render("users/perfilUser",{
            title:"Perfil",
            session: req.session
        })
    }, */
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
                avatar: req.file ? req.file.filename : "default-image.png",
                rol: "USER"
            })
            .then((user) => {
                req.session.userActive = {
                    id: user.id,
                    name: user.name,
                    lastName: user.lastName,
                    email: user.email,
                    avatar: user.avatar,
                    rol: user.rol
                }
                res.locals.user = req.session.userActive
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
    perfil:(req,res)=>{
        let id= +req.session.userActive.id;
        db.User.findOne({
            where: {
                id 
            },
        })
        .then((user) => {
            res.render('users/perfilUser', {
                title: "Perfil",
                old: req.body,
                user,
                session: req.session
            })
        })
        .catch(error => res.send(error))
    }, 
    perfilEdit:(req, res) => {
        let id = +req.session.userActive.id
        db.User.findOne({
            where: {
                id
            }
        })
        .then((user) => {
            res.render('users/perfilEdit', {
                title: "Perfil",
                old: req.body,
                user,
                session: req.session
            }) 
        })
        .catch(error => res.send(error))
    },
    perfilUpdate: async (req, res) => {
        try {
            let userEdit = await db.User.findByPk(req.params.id)
            await db.User.update({
                ...req.body,
                avatar: req.file ? req.file.filename : req.session.userActive.avatar
            },{
                where : {id : req.params.id}
            })
            let user = await db.User.findByPk(req.params.id)
            if(req.file){
                if (fs.existsSync(path.join(__dirname, "../../public/img/avatar", user.avatar)) &&
                    user.avatar !== "default-image.png"){
                    fs.unlinkSync( path.join(__dirname, "../../public/img/avatar", userEdit.avatar))
                }
            }
            req.session.userActive = {
                id: user.id,
                name: user.name,
                lastName: user.lastName,
                email: user.email,
                avatar: user.avatar,
                rol: user.rol
            }
            res.locals.user = req.session.userActive;
            res.redirect('/usuario/perfil')
        } catch (error) {
            console.log(error);
        }
    },
    userDelete: (req, res) => {
        req.session.destroy();
        if(req.cookies.CookieSonata){
            res.cookie('CookieSonata', '', {maxAge: -1}) 
        }
        res.redirect('/home')
    }

}