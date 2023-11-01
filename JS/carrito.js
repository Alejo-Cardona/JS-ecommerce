// Carrito y Key
let carrito = new Array();
const key_carrito = "9232"
let info_productos_carrito = document.querySelector(".info_productos_carrito");
let mensaje_estado_carrito = document.querySelector(".mensaje_info");
// suma del precio de los productos
let suma = 0;
// costo de envio
let envio = 1500;

function generar_card_carrito(nombre_producto,id_producto, precio_producto, imagen_url) {
    mensaje_estado_carrito.style.display = "none";
    info_productos_carrito.style.display = "block"

    let seccion = document.querySelector(".articulos_carrito");

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
        window.location.href = "./articuloInfo.html";
    });

    
    // Boton para eliminar del carrito
    let btn_eliminar = document.createElement("button"); 
    btn_eliminar.classList.add("btn-eliminar");
    btn_eliminar.textContent = "Eliminar del carrito";
    btn_eliminar.addEventListener("click", function() {
        carrito.forEach(producto => {
            if (producto.id === id_producto) {
                //Filtra los elementos que no coincidan con el ID proporcionado
                const carrito_actualizado = carrito.filter((producto) => producto.id !== id_producto);
                // Guardar el carrito actualizado en el localStorage
                localStorage.setItem(key_carrito, JSON.stringify(carrito_actualizado));
                // Recarga la página para reflejar los cambios
                window.location.reload();

            }
        });
    });

    new_h2.textContent = nombre_producto;
    new_p.textContent = precio_producto;

    // Agrego la info al cuerpo de la card
    new_div.appendChild(new_img);
    new_div.appendChild(new_h2);
    new_div.appendChild(new_p);
    new_div.appendChild(new_btn1);
    new_div.appendChild(btn_eliminar);

    // Agrego la card a la seccion
    seccion.appendChild(new_div);
    
}

// REALIZAR COMPRA
function comprarTodo(total) {
    localStorage.removeItem(key_carrito);
    // Sweet Alert
    Swal.fire({
        title: `Quieres proceder con el pago?`,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Si',
        denyButtonText: `No, me confundi`,
        cancelButtonText: 'Cancelar',
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            Swal.fire('Muchas gracias por tu compra!', '', 'success')
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } else if (result.isDenied) {
            Swal.fire('Cancelaste el proceso de pago', '', 'info')
        }
    })
}

// LIMPIAR TODO EL CARRITO
function limpiarElCarrito() {
    Swal.fire({
        title: 'Estas seguro de que quieres limpiar todo el carrito?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Si',
        denyButtonText: `No, me confundi`,
        cancelButtonText: 'Cancelar',
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            Swal.fire('Limpiaste todo!', '', 'success')
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } else if (result.isDenied) {
            Swal.fire('No eliminaste nada', '', 'info')
        }
    })
    localStorage.removeItem(key_carrito);
}


// ADMINISTRAR INFORMACIÓN
// Cargar los productos del carrito desde el localStorage al iniciar la página
if (localStorage.getItem(key_carrito)) {
    carrito = JSON.parse(localStorage.getItem(key_carrito));

    carrito.forEach(elemento => {
        let nombre_producto = elemento.nombre
        let id = elemento.id
        let precio_producto = "$"+ elemento.precio
        let imagen_producto = elemento.imagenes

        suma = suma + elemento.precio;
        //Generar card
        generar_card_carrito(nombre_producto, id, precio_producto, imagen_producto);

        //Genero un listado
        let name_precio = document.createElement("p");
        name_precio.textContent = `${nombre_producto} - ${precio_producto}`;

        info_productos_carrito.appendChild(name_precio);
    });

    let h3_envio = document.createElement("h3");
    h3_envio.textContent = `El costo de envio a todo el pais es de: $${envio}`;
    h3_envio.classList.add("costo_envio");

    let total = document.createElement("h3");
    total.textContent = `El total es de: $${suma + envio}`;

    let btn_comprar = document.createElement("button");
    btn_comprar.classList.add("btn_comprar");
    btn_comprar.textContent = "Realizar Compra";
    btn_comprar.addEventListener("click", function() {
        comprarTodo(total);
    });

    let btn_eliminar = document.createElement("button");
    btn_eliminar.classList.add("btn_eliminar");
    btn_eliminar.textContent = "Limpiar todo el carrito";
    btn_eliminar.addEventListener("click", function() {
        limpiarElCarrito();
    });

    info_productos_carrito.appendChild(h3_envio);
    info_productos_carrito.appendChild(total);
    info_productos_carrito.appendChild(btn_comprar);
    info_productos_carrito.appendChild(btn_eliminar);
}

//Función para agregar objetos al carrito
async function agregarAlCarrito(id_producto) {
    //Busco el producto por el id
    try {
        const resp = await fetch('../data.json');
        const data = await resp.json();
        const productos = data.productos;

        productos.forEach(producto => {
            if (producto.id === id_producto) {
                let nombre_producto = producto.nombre
                let id = producto.id
                let precio_producto = producto.precio
                let imagen_producto = producto.imagenes[0]
    
                let producto_carrito = new Producto("",nombre_producto, id,"", precio_producto, imagen_producto,"");
                carrito.push(producto_carrito);
    
                // Guardar el carrito actualizado en el localStorage
                localStorage.setItem(key_carrito, JSON.stringify(carrito));
            }
        });

        //Toastify menssage
        Toastify({
            text: "Agregaste el producto al carrito",
            duration: 3000,
            gravity: "bottom",
            style: {
                background: "#b70f0a",
            },
            }).showToast();
    } catch (error){
        console.log("Error al obtener datos:" + error);
    }
}
