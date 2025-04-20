document.getElementById("formPago").addEventListener("submit", function(event) {
    event.preventDefault();

    // Obtener los valores del formulario
    const fecha = document.getElementById("fecha").value;
    const descripcion = document.getElementById("descripcion").value;
    const proveedor = document.getElementById("proveedor").value;
    const monto = document.getElementById("monto").value;

    // Crear un objeto de pago
    const pago = {
        fecha,
        descripcion,
        proveedor,
        monto
    };

    // Guardar el pago en el almacenamiento local
    let pagos = JSON.parse(localStorage.getItem("pagos")) || [];
    pagos.push(pago);
    localStorage.setItem("pagos", JSON.stringify(pagos));

    // Limpiar el formulario
    document.getElementById("formPago").reset();

    // Mostrar la lista actualizada
    mostrarPagos();
});

// Función para mostrar los pagos guardados
function mostrarPagos() {
    const pagos = JSON.parse(localStorage.getItem("pagos")) || [];
    const listaPagos = document.getElementById("listaPagos");
    listaPagos.innerHTML = '';

    pagos.forEach(pago => {
        const li = document.createElement("li");
        li.textContent = ${pago.fecha} - ${pago.descripcion} - ${pago.proveedor} - $${pago.monto};
        listaPagos.appendChild(li);
    });
}

// Función para exportar los pagos a Excel
document.getElementById("exportarBtn").addEventListener("click", function() {
    const pagos = JSON.parse(localStorage.getItem("pagos")) || [];
    const ws = XLSX.utils.json_to_sheet(pagos);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Pagos");

    // Guardar el archivo Excel
    XLSX.writeFile(wb, "registros_pagos.xlsx");
});

// Mostrar pagos al cargar la página
mostrarPagos();
