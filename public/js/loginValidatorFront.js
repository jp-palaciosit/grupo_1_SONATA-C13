const QS = (element)=>document.querySelector(element)

window.addEventListener("load",()=>{
    let $inputEmail = QS("#email")
    let $inputPasswd = QS("#passwd")
    let $formulario = QS("#form")

    const validation = {
        valiPasswd:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,16}$/,
        valiEmail:/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    }

    let $errorEmail = QS("#errorEmail")
    let $errorPasswd = QS("#errorPasswd")
    let $errorSubmit= QS("#errorSubmit")

    $inputEmail.addEventListener("blur", e =>{
        switch(true){
            case !$inputEmail.value.trim():
                $errorEmail.innerHTML = "Escriba un email"
                break;
            case !validation.valiEmail.test($inputEmail.value):
                 $errorEmail.innerHTML = "El email es incorrecto"   
                break;
            default:
                $errorEmail.innerHTML = ""
        }
    })
    $inputPasswd.addEventListener("blur", e =>{
        switch(true){
            case !$inputPasswd.value.trim():
                $errorPasswd.innerHTML = "Escriba una contraseña"
                break;
            case !validation.valiPasswd.test($inputPasswd.value):
                 $errorPasswd.innerHTML = "La contraseña debe tener:<br> Entre 8 a 16 digitos <br>Una mayuscula<br>Una minuscula<br>Un numero<br>Y un caracter especial"   
                break;
            default:
                $errorPasswd.innerHTML = ""
        }
    })
    /* $formulario.addEventListener("submit", function(e){
        e.preventDefault();
        let form = this.elements
        for(let i = 0; i < form.length -1; i ++){
            if(form[i].value ==""){
                $errorSubmit.innerHTML = "Los datos señalados son obligatorios"
            }
            else{
                $errorSubmit.innerHTML = "Hay errores en el formulario"
            }
        }
         
    }) */
})