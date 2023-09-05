

function CarritoShop() {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const listaCarrito = document.getElementById("lista-carrito");
  const sumaTotalElemento = document.getElementById("suma-total");
  const botonBorrarCarrito = document.getElementById("borrar-carrito");
  const botonQuitarUltimo = document.getElementById("quitar-ultimo");
  actualizarCarrito();

  const productos = document.querySelectorAll(".producto");
  const botonAgregarCarrito = document.querySelectorAll(".agregar-carrito");

  botonAgregarCarrito.forEach((boton, index) => {
    boton.addEventListener("click", () => {
      const nombreProducto = productos[index].querySelector("p:first-child").textContent;
      const precioProducto = parseFloat(productos[index].querySelector("p:nth-child(2)").textContent.replace("Precio: $", ""));
      const iva = 1.21;
      const precioConIVA = (precioProducto * iva).toFixed(2);

      const mensajeAgregado = document.getElementById("mensaje-agregado");
    mensajeAgregado.style.display = "block";
    setTimeout(() => {
      mensajeAgregado.style.display = "none";
    }, 2000);



      const productoCarrito = {
        nombre: nombreProducto,
        precio: precioProducto,
        precioConIVA: parseFloat(precioConIVA),
        unidades: 1
      };
      carrito.push(productoCarrito);
      guardarCarritoEnLocalStorage();
      actualizarCarrito();
    });
  });

  botonBorrarCarrito.addEventListener("click", () => {
    carrito = [];
    guardarCarritoEnLocalStorage();
    actualizarCarrito();
  });

  botonQuitarUltimo.addEventListener("click", () => {
    carrito.pop();
    guardarCarritoEnLocalStorage();
    actualizarCarrito();
  });

  function guardarCarritoEnLocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }

  function actualizarCarrito() {
    listaCarrito.innerHTML = "";

    let sumaTotal = 0;
    carrito.forEach((producto) => {
      const subtotal = producto.precioConIVA * producto.unidades;
      sumaTotal += subtotal;

      const listItem = document.createElement("li");
      listItem.textContent = `${producto.nombre} - Precio: $${producto.precioConIVA} - Unidades: ${producto.unidades} - Subtotal: $${subtotal.toFixed(2)}`;
      listaCarrito.appendChild(listItem);
    });

    sumaTotalElemento.textContent = `Suma total: $${sumaTotal.toFixed(2)}`;
  }

  function obtenerProductosDelServidor() {
    return fetch('https://www.printful.com/es/blog/guia-algodon-poliester-telas-mixtas#:~:text=Las%20prendas%20hechas%20con%20fibras,deporte%2C%20porque%20atrapan%20el%20sudor.')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status}`);
        }
        return response.json();
      })
      .catch(error => {
        console.error('Hubo un error:', error);
      });
  }

  obtenerProductosDelServidor()
    .then(datos => {
      datos.forEach(producto => {
        const precioProducto = parseFloat(producto.precio);
        const iva = 1.21;
        const precioConIVA = (precioProducto * iva).toFixed(2);

        const productoCarrito = {
          nombre: producto.nombre,
          precio: precioProducto,
          precioConIVA: parseFloat(precioConIVA),
          unidades: 1
        };

        carrito.push(productoCarrito);
      });

      guardarCarritoEnLocalStorage();
      actualizarCarrito();
    });
}

CarritoShop();
