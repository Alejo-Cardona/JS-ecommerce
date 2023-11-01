
class Producto {
    constructor(categoria = "" , nombre, id, color = "", precio = 0, imagenes = "", destacado = 0) {
        this.categoria = categoria.toUpperCase();
        this.nombre = nombre;
        this.id = parseInt(id);
        this.color = color;
        this.precio = parseFloat(precio);
        this.vendido = false
        this.imagenes = imagenes; // Un array de URLs de imágenes
        this.destacado = destacado;
    }

    // Defino un metodo estatico para recuperar los metodos de la clase
    static new_Producto(objeto){
        new Producto(objeto.categoria, objeto.nombre, objeto.id, objeto.categoria, objeto.precio, objeto.imagenes);
    }

    // Metodos de la clase
    Vender() {
        this.vendido = true;
    }

    sumarEnvio(costoEnvio) {
        this.precio += costoEnvio 
    }

    // Metodo para mostrar la descripciónes de los productos
    getDescripcionProduct() {
        let msj = `${this.categoria}, ${this.nombre}, ${this.color}, $${this.precio}`
        return msj
    }

    setActualizarPrecio(NuevoPrecio) {
        this.precio = NuevoPrecio
    }

    setAumentoPrecio(porcentaje_aumento) {
        this.precio += (porcentaje_aumento * this.precio) / 100
    }
}