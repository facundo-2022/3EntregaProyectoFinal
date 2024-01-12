// productscript.js

async function cargarProductos() {
    try {
        const response = await axios.get('/api/productos'); // Ruta configurada en tu servidor
        const productos = response.data;

        var productosContainer = document.getElementById('productos-container');
        productosContainer.innerHTML = productos.map(productoTemplate).join('');
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
}

function agregarAlCarrito(index) {
    var cantidadSeleccionada = parseInt(document.querySelector(`input[data-producto="${index}"]`).value, 10);
    if (cantidadSeleccionada > 0) {
        var producto = { ...productos[index], cantidad: cantidadSeleccionada };
        carrito.push(producto);
        actualizarCarrito();
    }
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

function actualizarCarrito() {
    var carritoContainer = document.getElementById('carrito-container');
    carritoContainer.innerHTML = carritoTemplate({ carrito });
    // Puedes actualizar otras partes de tu interfaz aquí
}

// Resto del código para manejar el carrito y otras funciones
// ...
