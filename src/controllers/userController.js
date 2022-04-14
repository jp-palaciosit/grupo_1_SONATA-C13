

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
    }
    
}