


// FUNCION PARA GENERAR UNA CARD
function generar_card_articulo(componente_spawn, nombre_producto, precio_producto, imagen_url) {

    let seccion = document.querySelector(componente_spawn);

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


    new_h2.textContent = nombre_producto;
    new_p.textContent = precio_producto;

    // Agrego la info al cuerpo de la card
    new_div.appendChild(new_img);
    new_div.appendChild(new_h2);
    new_div.appendChild(new_p);

    // Agrego la card a la seccion
    seccion.appendChild(new_div);
}

//Función para mostrar los productos mas vendidos
function mostrarProductos_mas_vendidos() {
    const productosMasVendidos = productos.slice(0, 8);

    for (const elemento of productosMasVendidos) {
        let nombre_producto = elemento.nombre
        let precio_producto = "$" + elemento.precio
        let imagen_producto = elemento.imagenes[0]
        generar_card_articulo(".seccion-articulos-populares", nombre_producto, precio_producto, imagen_producto);
    }
}

mostrarProductos_mas_vendidos()

// Funcion para mostrar productos por categoria elegida
function mostrarProductos_Categoria(categori) {
    
    for (const elemento of productos) {
        if (elemento.categoria === categori.toUpperCase()) {
            let nombre_producto = elemento.nombre
            let precio_producto = elemento.precio
            generar_card_articulo(nombre_producto, precio_producto);
        }
    }
}
