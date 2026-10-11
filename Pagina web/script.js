```javascript
let inventario = [];
let ventas = [];


function mostrarSeccion(seccion) {

    document.getElementById("inicio").classList.add("oculto");
    document.getElementById("inventario").classList.add("oculto");
    document.getElementById("ventas").classList.add("oculto");

    document.getElementById(seccion).classList.remove("oculto");

    if (seccion === "inventario") {
        mostrarInventario();
    }

    if (seccion === "ventas") {
        actualizarProductosVenta();
        mostrarVentas();
    }
}


function guardarProducto() {

    let nombre = document.getElementById("nombreProducto").value;
    let precio = parseFloat(document.getElementById("precioProducto").value);
    let cantidad = parseInt(document.getElementById("cantidadProducto").value);

    let indice = document.getElementById("indiceEditar").value;


    if (nombre === "" || isNaN(precio) || isNaN(cantidad)) {
        alert("Completa todos los campos.");
        return;
    }


    if (indice === "") {

        inventario.push({
            nombre: nombre,
            precio: precio,
            cantidad: cantidad
        });

    } else {

        inventario[indice].nombre = nombre;
        inventario[indice].precio = precio;
        inventario[indice].cantidad = cantidad;
    }


    limpiarFormulario();
    mostrarInventario();
    actualizarProductosVenta();
    actualizarResumen();
}


function mostrarInventario() {

    let tabla = document.getElementById("tablaInventario");
    let buscar = document.getElementById("buscar").value.toLowerCase();

    tabla.innerHTML = "";


    inventario.forEach(function(producto, indice) {

        if (producto.nombre.toLowerCase().includes(buscar)) {

            let fila = tabla.insertRow();

            fila.insertCell(0).innerHTML = producto.nombre;
            fila.insertCell(1).innerHTML =
                "Q" + producto.precio.toFixed(2);

            fila.insertCell(2).innerHTML = producto.cantidad;


            let acciones = fila.insertCell(3);


            let botonEditar = document.createElement("button");

            botonEditar.innerHTML = "Editar";
            botonEditar.className = "editar";

            botonEditar.onclick = function() {
                editarProducto(indice);
            };


            let botonEliminar = document.createElement("button");

            botonEliminar.innerHTML = "Eliminar";
            botonEliminar.className = "eliminar";

            botonEliminar.onclick = function() {
                eliminarProducto(indice);
            };


            acciones.appendChild(botonEditar);
            acciones.appendChild(botonEliminar);
        }

    });
}


function editarProducto(indice) {

    let producto = inventario[indice];

    document.getElementById("nombreProducto").value =
        producto.nombre;

    document.getElementById("precioProducto").value =
        producto.precio;

    document.getElementById("cantidadProducto").value =
        producto.cantidad;

    document.getElementById("indiceEditar").value = indice;
}


function eliminarProducto(indice) {

    if (confirm("¿Quieres eliminar este producto?")) {

        inventario.splice(indice, 1);

        mostrarInventario();
        actualizarProductosVenta();
        actualizarResumen();
    }
}


function limpiarFormulario() {

    document.getElementById("nombreProducto").value = "";
    document.getElementById("precioProducto").value = "";
    document.getElementById("cantidadProducto").value = "";
    document.getElementById("indiceEditar").value = "";
}


function actualizarProductosVenta() {

    let select = document.getElementById("productoVenta");

    select.innerHTML =
        '<option value="">Selecciona un producto</option>';


    inventario.forEach(function(producto, indice) {

        let opcion = document.createElement("option");

        opcion.value = indice;

        opcion.textContent =
            producto.nombre + " - Q" +
            producto.precio.toFixed(2);

        select.appendChild(opcion);
    });
}


function registrarVenta() {

    let indice = document.getElementById("productoVenta").value;
    let cantidad = parseInt(
        document.getElementById("cantidadVenta").value
    );

    let recibido = parseFloat(
        document.getElementById("dineroRecibido").value
    );


    if (indice === "" || isNaN(cantidad) || isNaN(recibido)) {

        alert("Completa todos los datos de la venta.");
        return;
    }


    let producto = inventario[indice];


    if (cantidad <= 0) {

        alert("La cantidad debe ser mayor que 0.");
        return;
    }


    if (cantidad > producto.cantidad) {

        alert("No hay suficiente producto en inventario.");
        return;
    }


    let total = producto.precio * cantidad;


    if (recibido < total) {

        alert("El dinero recibido no es suficiente.");
        return;
    }


    let cambio = recibido - total;


    producto.cantidad -= cantidad;


    ventas.push({
        producto: producto.nombre,
        cantidad: cantidad,
        total: total
    });


    document.getElementById("resultadoVenta").innerHTML =
        "Total: Q" + total.toFixed(2) +
        "<br>Dinero recibido: Q" + recibido.toFixed(2) +
        "<br>Cambio: Q" + cambio.toFixed(2);


    document.getElementById("cantidadVenta").value = "";
    document.getElementById("dineroRecibido").value = "";


    mostrarInventario();
    mostrarVentas();
    actualizarProductosVenta();
    actualizarResumen();
}


function mostrarVentas() {

    let tabla = document.getElementById("tablaVentas");

    tabla.innerHTML = "";


    ventas.forEach(function(venta) {

        let fila = tabla.insertRow();

        fila.insertCell(0).innerHTML = venta.producto;
        fila.insertCell(1).innerHTML = venta.cantidad;
        fila.insertCell(2).innerHTML =
            "Q" + venta.total.toFixed(2);

    });
}


function actualizarResumen() {

    document.getElementById("totalProductos").innerHTML =
        inventario.length;

    document.getElementById("totalVentas").innerHTML =
        ventas.length;


    let total = 0;

    ventas.forEach(function(venta) {
        total += venta.total;
    });


    document.getElementById("dineroVentas").innerHTML =
        "Q" + total.toFixed(2);
}
```
