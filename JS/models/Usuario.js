
class Usuario {
    constructor(nombre, contrasena, correo, telefono) {
        this.contrasena = contrasena;
        this.nombre = nombre;
        this.telefono = telefono;
        this.correo = correo;
        this.admin = false
    }

    // Defino un metodo estatico para recuperar los metodos de la clase
    static new_Usuario(objeto){
        return new Usuario(objeto.contrasena, objeto.nombre, objeto.telefono, objeto.correo);
    }

    setHacerAdmin() {
        this.admin = true;
    }

    getDescripcionUser() {
        let info = "";

        if (this.admin === false) {
            info = "El usuario no tiene permisos de admin"
        }
        else {
            info = "El usuario tiene permisos de admin"
        }

        let msj = `Descripción del usuario solicitado \n Nombre: ${this.nombre} \n telefono: ${this.telefono} \n Correo: ${this.correo} \n Permisos: ${info}`
        
        return msj
    }
    
}