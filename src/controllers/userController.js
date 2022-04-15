const {getUsers, writeUsers} = require("../data")

module.exports = {
    login: (req, res)=>{
        res.render("users/login",{
            title:"Login"
        })
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
        /* Haciendo la comparacion si se recibe nuevo dato y creando un objeto */

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
            terminosCoindiciones: req.body.terCondi
        }

        /* Pusheando datos recibidos en el array */
        getUsers.push(newUser)

        /* Escribiendo en el json */
        writeUsers(getUsers)

        /* Redireccionamiento */
        res.redirect("/usuario")
       
    }
    
}