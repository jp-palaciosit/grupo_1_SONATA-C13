const QS = (element)=>document.querySelector(element)

window.addEventListener("load", ()=>{
    let $formulario = QS("form#form")
    let $inputName = QS("#name")
    let $inputLastName = QS("#lastName")
    let $inputEmail = QS("#email")
    let $inputPasswd = QS("#passwd")
    let $inputFile = QS("#file")
    let $inputCaptcha = QS("#captcha")
    let $inputTC = QS("#TerminoCondicion")
    let $viewFile = QS("#viewFile")

    /* Expresiones */
    const validation = {
        valiName :/^[a-zA-ZÀ-ÿ\s]{2,40}$/,
        valiLastName:/^[a-zA-ZÀ-ÿ\s]{2,40}$/,
        valiPasswd:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,16}$/
        /* /^(?=(?:.*\d))(?=(?:.*[A-Z]))(?=(?:.*[a-z]))\S{8,}$/ */,
        valiEmail:/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        valiTelefono:/^\d{7,14}$/
    }
    /* errors */
    let $errorName = QS("#errorName")
    let $errorLastName = QS("#errorLastName")
    let $errorEmail = QS("#errorEmail")
    let $errorPasswd = QS("#errorPasswd")
    let $errorFile = QS("#errorFile")
    let $errorCaptcha = QS("#errorCaptcha")
    let $errorTC = QS("#errorTC")
    let errorSubmit= QS("#errorSubmit")
    let $errorForm = QS("#errorForm") 

    let errors = {
        name:false,
        lastName:false,
        email:false,
        passwd: false,
        telefono:false
    }

    $inputName.addEventListener("blur", e =>{
        switch(true){
            case !$inputName.value.trim():
                $errorName.innerHTML = "Escriba su nombre"
                break;
            case !validation.valiName.test($inputName.value):
                 $errorName.innerHTML = "Nombre invalido"   
                break;
            default:
                $errorName.innerHTML = ""
        }
    })
    $inputLastName.addEventListener("blur", e =>{
        switch(true){
            case !$inputLastName.value.trim():
                $errorLastName.innerHTML = "Escriba su apellido"
                break;
            case !validation.valiLastName.test($inputLastName.value):
                 $errorLastName.innerHTML = "Apellido invalido"   
                break;
            default:
                $errorLastName.innerHTML = ""
        }
    })
    $inputEmail.addEventListener("blur", e =>{
        switch(true){
            case !$inputEmail.value.trim():
                $errorEmail.innerHTML = "Escriba un email"
                break;
            case !validation.valiEmail.test($inputEmail.value):
                 $errorEmail.innerHTML = "El email invalido"   
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
    $inputCaptcha.addEventListener("click", ()=>{
        $inputCaptcha.value = "on"
        $inputCaptcha.innerHTML = ""
    })
    $inputTC.addEventListener("click", ()=>{
        $inputTC.value = "on"
        $inputTC.innerHTML = ""
    })
    $inputFile.addEventListener("change", function fileValidation(){
        let fileCapturado = $inputFile.value, extensionesPermitidas = /(.jpg|.jpeg|.png|.gif)$/i
        if(!extensionesPermitidas.exec(fileCapturado)){
            $errorFile.innerHTML = "Carga un archivo valido este <br>debe tener alguna de las<br> extensiones permitidas<br>(.jpg |.jpeg |.png |.gif)"
            $inputFile.value = ""
            $viewFile.innerHTML = ""
            return false
        }
        else{
            $errorFile.innerHTML = ""
        }
    })
    

    $formulario.addEventListener("submit", function(e){
        e.preventDefault()

        let form = this.elements
        let errores = false

        for(let i = 0; i < form.length -1; i ++){
            if(form[i].value =="" 
            && form[i].name !== "avatar"
            && form[i].type !== "file"){
                errorSubmit.innerHTML= "Los datos señalados son obligatorios"
                errores = true
            }
        }
        if(!errores){
            $formulario.submit()
        }
         
    })
        /* $formulario.addEventListener("submit", e =>{
            e.preventDefault();
            if(!errors.passwd){
                $formulario.submit()
            }
            else{
                alert("Hay errores en el formulario")
            }
        })
    })  */
})