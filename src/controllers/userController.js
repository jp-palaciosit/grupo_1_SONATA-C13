const {getUsers, writeUsers} = require("../data")
const {validationResult} = require("express-validator")

module.exports = {
    login: (req, res)=>{
        res.render("users/login",{
            title:"Login"
        })
    },
    //Simulacion de logeo
    loginProcess:(req, res)=>{
        let errors = validationResult(req)
        if(errors.isEmpty()){
            res.redirect("/home")
        }
        else{
            res.render("users/login",{
                title:"Login",
                errors: errors.mapped()
            })
        }
    },
    register: (req, res)=>{
        res.render("users/register", {
            title: "Register"
        })

    },
    recPasswd: (req, res)=>{
        res.render("users/recuperarContra",{
            title:"Rec_Passwd"
        })
    },
    registrado:(req, res)=>{
        res.render("users/datosUser",{
            title: "Gracias"
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
                passwd: req.body.passwd,
                captcha: req.body.captcha,
                terminosCoindiciones: req.body.terCondi,
                avatar: req.file ? req.file.filename : "default-image.png"
            }
            getUsers.push(newUser)
            writeUsers(getUsers)

            res.redirect("/usuario/login")

        }
        else{
            res.render("users/register",{
                titulo: "Register",
                errors: errors.mapped(),
                old: req.body
            })
        }


       
       
    }
    
}