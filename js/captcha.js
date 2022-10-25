let captchaCode = document.querySelector("#captcha");
let captchaInput = document.querySelector("#captchaInput");
let btn_registrar = document.querySelector("#btn_registrar");
let mensaje = document.querySelector("#mensaje");


function crearCaptchaRandom() {
    let randomString = "";
    let strDeCaracteres = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890"
    for (let index = 0; index < 6; index++) {
        //setea una linea de 6 digitos que pueden ser numeros o letras, mathrandom genera los num y arriba se toma las letras//
        randomString = randomString + strDeCaracteres.charAt(Math.floor(Math.random()*strDeCaracteres.length));
    }
    return randomString;
}
function mostrarCaptcha(){
    captchaCode.innerHTML = crearCaptchaRandom(); 
 }
mostrarCaptcha();

function validarCaptcha() {
   if (captchaCode.innerHTML === captchaInput.value){ //es necesario el triple= para acegurarse que el digito que se ingrese sea el mismo exacto//
       console.log("es valido");
       mensaje.innerHTML = "captcha valido";

    }else{
        console.log("es incorrecto");
        mensaje.innerHTML = "captcha invalido";
    }
}

function validarPassword(){//sett de la contrseña y confirmacion de la misma//
    if (document.querySelector("#password").value!==document.querySelector("#password2").value){
        document.querySelector("#mensajePswd").innerHTML = "contraseña no coincide";
    }else{
        document.querySelector("#mensajePswd").innerHTML = "contraseña valida";
    }
}
btn_registrar.addEventListener("click", function (e){
    e.preventDefault();//sin esto el programa nunca frena y se actualiza continuamente la pagina sin resultado//
    validarCaptcha();
    validarPassword(); 
});

