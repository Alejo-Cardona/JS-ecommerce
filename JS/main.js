// FUNCION PARA GENERAR UNA CARD
function generar_card_articulo(seccion_spawn, nombre_producto,id_producto, precio_producto, imagen_url) {

    let seccion = document.querySelector(seccion_spawn);

    // Cuerpo de la card
    let new_div = document.createElement("div");
    new_div.classList.add("cuerpo_card");

    // Imagen de la card
    let new_img = document.createElement("img");
    new_img.classList.add("img-producto");
    new_img.src = imagen_url; //cambio su url

    // Nombre del producto
    let new_h2 = document.createElement("h2");
    new_h2.classList.add("product-name");

    // Precio del producto
    let new_p = document.createElement("p"); 
    new_p.classList.add("product-price");

    // Boton para mas info
    let new_btn1 = document.createElement("button"); 
    new_btn1.classList.add("btn-info");
    new_btn1.textContent = "info"
    new_btn1.addEventListener('click', function() {
        //Guardo el id para que no se pierda la redireccionar
        localStorage.setItem("key_2323", id_producto);
        obtenerInfoArticulo();
        window.location.href = window.location.href.endsWith("index.html") ? "./Pages/articuloInfo.html" : "./articuloInfo.html";
    });

    // Boton para agregar al carrito
    let new_btn2 = document.createElement("button"); 
    new_btn2.classList.add("btn-carrito");
    new_btn2.textContent = "Agregar al Carrito"
    new_btn2.addEventListener("click", function() {
        agregarAlCarrito(id_producto);
    });

    new_h2.textContent = nombre_producto;
    new_p.textContent = precio_producto;

    // Agrego la info al cuerpo de la card
    new_div.appendChild(new_img);
    new_div.appendChild(new_h2);
    new_div.appendChild(new_p);
    new_div.appendChild(new_btn1);
    new_div.appendChild(new_btn2);

    // Agrego la card a la seccion
    seccion.appendChild(new_div);
}

// Función para mostrar los productos mas vendidos
async function mostrarProductos_mas_destacados() {
    try {
        const resp = await fetch('../data.json');
        const data = await resp.json();
        const productos = data.productos;
        
        productos.forEach(producto => {
            if (producto.destacado === 1) {
                let nombre_producto = producto.nombre
                let id_producto = producto.id
                let precio_producto = "$" + producto.precio
                let imagen_producto = producto.imagenes[0]
                generar_card_articulo(".seccion-articulos-populares",nombre_producto,id_producto , precio_producto, imagen_producto);
            }
        })
    } catch (error){
        console.log("Error al obtener datos:" + error);
    }
}


mostrarProductos_mas_destacados()



// CONTROLADOR DE EVENTOS ARTICULOS
// Local Storage
let categoria_guardada = ""
const categoria_key = "2364"


// Guardo los componentes
let jeans_link = document.querySelector("#jeans-link");
let accesorios_link = document.querySelector("#accesorios-link");

let Remeras = document.querySelector(".img-article1");
let Buzos_Camperas = document.querySelector(".img-article2");
let Lentes = document.querySelector(".img-article3");
let Calzado = document.querySelector(".sec2-img-article1");
let Camisas = document.querySelector(".sec2-img-article2");

function asignarCategoria(categoria) {
    categoria_guardada = categoria;
    localStorage.setItem(categoria_key, categoria_guardada);
}

jeans_link.addEventListener("click", function(event) {
    asignarCategoria("Jeans");
});

accesorios_link.addEventListener("click", function(event) {
    asignarCategoria("Accesorios");
});

Remeras.addEventListener("click", function(event) {
    asignarCategoria("Remeras");
});

Buzos_Camperas.addEventListener("click", function(event) {
    asignarCategoria("Camperas");
});

Lentes.addEventListener("click", function(event) {
    asignarCategoria("Lentes");
});

Calzado.addEventListener("click", function(event) {
    asignarCategoria("Calzado");
});

Camisas.addEventListener("click", function(event) {
    asignarCategoria("Camisas");
});