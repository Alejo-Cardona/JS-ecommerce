// ------------- VALIDACIÓN DEL FORMULARIO ------------------
function validar_formulario_registro() {

    if (localStorage.getItem("MensajesKey1") !== null) {
        // Si hay contenido, lo eliminamos
        localStorage.removeItem("MensajesKey1");
    }

    let caracteres_especiales = ".,>>-_{}()[]@"
    let numeros = "0123456789"
    let mensajes_de_error = "";

    let nombre = document.getElementById("nombre").value;
    let correo = document.getElementById("email").value;
    let telefono = document.getElementById("number").value;
    let contrasena = document.getElementById("password").value;

    // Validación campos incompletos
    if(nombre.trim() === "" || correo.trim() === "" || telefono.trim() === "" || contrasena.trim() === ""){
        let mensaje_ERROR = "- Por favor, es obligatorio completar todos los campos. "
        mensajes_de_error += mensaje_ERROR;
    }

    // Validación del correo
    if(correo.indexOf("gmail.com") === -1 && correo.indexOf("hotmail.com") === -1 && correo.indexOf("yahoo.com") === -1 && correo.indexOf("outlook.com") === -1 || correo.indexOf(" ") != -1) {
        let mensaje_ERROR = "- ingresaste un correo invalido. "
        mensajes_de_error += mensaje_ERROR;
    }

    // Validación del Nombre
    if(nombre.length < 4){
        let mensaje_ERROR = "- Ingresaste un nombre muy corto. "
        mensajes_de_error += mensaje_ERROR;
    }
    
    // Si se encuentra un caracter especial o número en el nombre, salta error
    for(caracter of nombre){
        if (caracteres_especiales.indexOf(caracter) != -1) {
            let mensaje_ERROR = "- Tu nombre no puede contener caracteres especiales. "
            mensajes_de_error += mensaje_ERROR;
            break;
        }
        if (numeros.indexOf(caracter) != -1) {
            let mensaje_ERROR = "- Tu nombre no puede contener números. "
            mensajes_de_error += mensaje_ERROR;
            break;
        }
    }

    // Validación del telefono
    if(telefono.length <= 7) {
        let mensaje_ERROR = "- En el telefono, te falto ingresar tu código de area. "
        mensajes_de_error += mensaje_ERROR;
    }

    // Validación de la contraseña
    if(contrasena.length < 5){
        let mensaje_ERROR = "- Ingresaste una contraseña muy corta. "
        mensajes_de_error += mensaje_ERROR;
    }

    // DEVOLVER MENSAJES DE ERROR AL USUARIO
    if(mensajes_de_error.length > 0) {
        mensajes_de_error = mensajes_de_error.split("-")
        // GUARDO LOS MENSAJES
        let lista_mensajes = JSON.stringify(mensajes_de_error);
        localStorage.setItem("MensajesKey1", lista_mensajes);
        const lista_mensajes_recuperada = JSON.parse(localStorage.getItem("MensajesKey1"));

        // Guardo la seccion donde se deben agregar los mensajes
        let seccion_mensajes_error = document.querySelector("#seccion_mensajes_error");
        let new_h3 = document.createElement("h3");
        new_h3.classList.add("error_mensaje_titulo");
        new_h3.textContent = "ERROR AL ENVIAR EL FORMULARIO";
        seccion_mensajes_error.appendChild(new_h3);

        seccion_mensajes_error.style.display = 'block';

        // Sweet Alert
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'ERROR AL ENVIAR EL FORMULARIO',
            showConfirmButton: false,
            timer: 1500
        })
        
        for(mensaje of lista_mensajes_recuperada) {
            let new_p = document.createElement("p");
            new_p.classList.add("error_mensaje");
            new_p.textContent = mensaje;
            seccion_mensajes_error.appendChild(new_p);
        }
    
    return false;
    } else {
        seccion_mensajes_error.style.display = 'none';
        return true;
    }
}


// ------------------ REGISTRO DEL USUARIO - DATA -------------------
const nuevos_usuarios = new Array();
const key_coleccion_datos = "8723";

function recuperar_usuario() {
    usuarios_recuperados = JSON.parse(localStorage.getItem(key_coleccion_datos));
    for (user of nuevos_usuarios) {
        let usuario_recuperado = Usuario.new_Usuario(user);
    }
    return usuario_recuperado;
}

function registrar_usuario(){

    // Tomo los valores del usuario
    let nombre = document.querySelector("#nombre").value;
    let correo = document.querySelector("#email").value;
    let telefono = document.querySelector("#number").value;
    let contrasena = document.querySelector("#password").value;

    // Creo el objeto y lo pusheo al Array
    let new_usuario = new Usuario(contrasena, nombre, telefono, correo);
    nuevos_usuarios.push(new_usuario);

    localStorage.setItem(key_coleccion_datos, JSON.stringify(nuevos_usuarios));

    // Sweet Alert
    Swal.fire({
        icon: 'success',
        title: `felicidades, te registraste de forma exitosa ${nombre}`,
        showConfirmButton: false,
        timer: 2000
    })
}


// --------------- CONTROLADOR DE EVENTOS DEL FORMULARIO ----------------
let formulario = document.querySelector(".form-registro");

// Agrega un controlador de eventos al formulario
formulario.addEventListener("submit", function (event) {
    event.preventDefault(); // Previene el comportamiento predeterminado de enviar el formulario

    if (validar_formulario_registro()) {
        registrar_usuario();
        this.reset(); // Limpia el formulario

        // Cambia el estilo del formulario a 'none'
        const formularioRegistro = document.querySelector(".formulario-de-registro");
        formularioRegistro.style.display = "none";
    }

});

