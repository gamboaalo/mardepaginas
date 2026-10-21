// Buscamos los botones, la lista y el total que ya existen en el HTML.
const botonesAgregar = document.querySelectorAll(".agregar");
const listaCarrito = document.getElementById("lista");
const textoTotal = document.getElementById("total");
const botonVaciar = document.getElementById("vaciar");
const botonCarrito = document.getElementById("boton-carrito");
const botonCerrarCarrito = document.getElementById("cerrar-carrito");
const contador = document.getElementById("contador");
const panelCarrito = document.getElementById("panel-carrito");
const zonaCarrito = document.querySelector(".zona-carrito");

let total = 0;
let cantidadLibros = 0;

// Actualizamos tanto el panel como el estado accesible del botón.
function mostrarCarrito(abierto) {
    panelCarrito.classList.toggle("activo", abierto);
    panelCarrito.setAttribute("aria-hidden", String(!abierto));
    botonCarrito.setAttribute("aria-expanded", String(abierto));
}

botonCarrito.addEventListener("click", () => {
    const estaAbierto = botonCarrito.getAttribute("aria-expanded") === "true";
    mostrarCarrito(!estaAbierto);
});

botonCerrarCarrito.addEventListener("click", () => {
    mostrarCarrito(false);
});

// Cerramos el panel al hacer clic fuera de él o al presionar Escape.
document.addEventListener("click", (evento) => {
    if (!zonaCarrito.contains(evento.target)) {
        mostrarCarrito(false);
    }
});

document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape") {
        mostrarCarrito(false);
    }
});

// Cada botón pertenece a una tarjeta que guarda su título y precio en data-atributos.
botonesAgregar.forEach((boton) => {
    boton.addEventListener("click", () => {
        const tarjeta = boton.closest(".tarjeta");
        const titulo = tarjeta.dataset.titulo;
        const precio = Number(tarjeta.dataset.precio);

        // Creamos una fila segura usando textContent para mostrar el libro agregado.
        const elemento = document.createElement("li");
        const nombreLibro = document.createElement("span");
        const precioLibro = document.createElement("span");
        nombreLibro.textContent = titulo;
        precioLibro.textContent = `$${precio}`;
        elemento.append(nombreLibro, precioLibro);
        listaCarrito.appendChild(elemento);

        total += precio;
        cantidadLibros += 1;
        textoTotal.textContent = total;
        contador.textContent = cantidadLibros;
    });
});

// Al vaciar, eliminamos los libros y dejamos el total listo para empezar de nuevo.
botonVaciar.addEventListener("click", () => {
    listaCarrito.innerHTML = "";
    total = 0;
    cantidadLibros = 0;
    textoTotal.textContent = total;
    contador.textContent = cantidadLibros;
});
