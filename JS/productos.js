// Funcion para mostrar productos por categoria elegida
async function mostrarProductos_Categoria() {
    try {
        const categori = localStorage.getItem(categoria_key);
        const resp = await fetch('../data.json');
        const data = await resp.json();
        const productos = data.productos;

        productos.forEach(product => {
            if(product.categoria === categori) {
                let nombre_producto = product.nombre;
                let id_producto = product.id
                let precio_producto = "$" + product.precio
                let imagen_producto = product.imagenes[0]

                generar_card_articulo(".seccion-articulos-filtrados", nombre_producto,id_producto, precio_producto, imagen_producto)
            }
        })

    } catch (error){
        console.log("Error al obtener datos:" + error);
    }
}

mostrarProductos_Categoria()


//  GENERAR INFO DEL ARTICULO
function generarInfoArticulo(nombre, precio, imagenes, color, categoria, id) {
    let seccion_imagenes_articulo = document.querySelector(".seccion-imagenes-articulo")
    let seccion_informacion_articulo = document.querySelector(".seccion-informacion-articulo")

    // Creo el cuerpo de la info
    let new_div = document.createElement("div");
    new_div.classList.add("info");

    // Creo la info
    let new_p1 = document.createElement("p");
    new_p1.textContent = `Producto: ${nombre}` //Nombre
    new_p1.classList.add("nombre");

    let new_p2 = document.createElement("p"); // Categoria
    new_p2.textContent = `Categoria: ${categoria}`

    let new_p3 = document.createElement("p"); // Precio
    new_p3.textContent = `Precio: $${precio}`

    let new_p4 = document.createElement("p"); // Color
    new_p4.textContent = `Color: ${color}`

    // Creo los botones
    let btn_comprar_product = document.createElement("button");
    btn_comprar_product.textContent = `Comprar ahora` //Boton para comprar
    btn_comprar_product.classList.add("btn_comprar_product");
    btn_comprar_product.addEventListener("click", function() {
        agregarAlCarrito(id);
    });

    let btn_añadir_carrito = document.createElement("button");
    btn_añadir_carrito.textContent = `Comprar ahora` //Boton para añadir al carrito
    btn_añadir_carrito.classList.add("btn_comprar_product");
    btn_añadir_carrito.addEventListener("click", function() {
        agregarAlCarrito(id);
    });

    // Creo la imagen
    let new_img = document.createElement("img");
    new_img.classList.add("imagen_producto");
    new_img.src = imagenes
    
    // Añado la imagen a la seccion
    seccion_imagenes_articulo.appendChild(new_img);

    // Añado toda la info a la seccion
    new_div.appendChild(new_p1);
    new_div.appendChild(new_p2);
    new_div.appendChild(new_p3);
    new_div.appendChild(new_p4);
    new_div.appendChild(btn_comprar_product);
    new_div.appendChild(btn_añadir_carrito);
    seccion_informacion_articulo.appendChild(new_div);
}

//  OBTENER INFO DEL ARTICULO
async function obtenerInfoArticulo() {
    try {
        let id_producto = localStorage.getItem("key_2323")

        const resp = await fetch('../data.json');
        const data = await resp.json();
        const productos = data.productos;

        productos.forEach(producto => {
            if (producto.id === id_producto) {
                let nombre_producto = producto.nombre;
                let id = producto.id;
                let precio_producto = producto.precio;
                let imagenes_producto = producto.imagenes[0];
                let color_producto = producto.color;
                let categoria_producto = producto.categoria;
                generarInfoArticulo(nombre_producto, precio_producto, imagenes_producto, color_producto, categoria_producto, id)
            }
        })
    } catch (error){
        console.log("Error al obtener datos:" + error);
    }
}