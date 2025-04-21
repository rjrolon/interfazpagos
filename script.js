document.getElementById("formPago").addEventListener("submit", function(event) {
    event.preventDefault();

    const fecha = document.getElementById("fecha").value;
    const descripcion = document.getElementById("descripcion").value;
    const monto = document.getElementById("monto").value;
    const bancoSeleccionado = document.getElementById("banco").value;
    const subcuentaSeleccionada = document.getElementById("subcuenta").value;

    if (!bancoSeleccionado || !subcuentaSeleccionada) {
        alert("Por favor, selecciona un banco y una subcuenta.");
        return;
    }

    // Registrar pago
    const pago = {
        fecha,
        descripcion,
        monto,
        banco: bancoSeleccionado,
        subcuenta: subcuentaSeleccionada
    };

    let pagos = JSON.parse(localStorage.getItem("pagos")) || [];
    pagos.push(pago);
    localStorage.setItem("pagos", JSON.stringify(pagos));

    // Limpiar el formulario y mostrar la lista de pagos
    document.getElementById("formPago").reset();
    mostrarPagos();
});

// Mostrar los pagos registrados
function mostrarPagos() {
    const pagos = JSON.parse(localStorage.getItem("pagos")) || [];
    const listaPagos = document.getElementById("listaPagos");
    listaPagos.innerHTML = '';

    pagos.forEach(pago => {
        const li = document.createElement("li");
        li.textContent = ${pago.fecha} - ${pago.descripcion} - $${pago.monto} - Banco: ${pago.banco} - Subcuenta: ${pago.subcuenta};
        listaPagos.appendChild(li);
    });
}

// Agregar un banco
document.getElementById("agregarBancoBtn").addEventListener("click", function() {
    const bancoNombre = prompt("Ingrese el nombre del banco:");

    if (bancoNombre) {
        let bancos = JSON.parse(localStorage.getItem("bancos")) || [];
        if (!bancos.find(banco => banco.nombre === bancoNombre)) {
            bancos.push({ nombre: bancoNombre, subcuentas: [] });
            localStorage.setItem("bancos", JSON.stringify(bancos));
            actualizarSelectBancos();
            mostrarBancos();
        } else {
            alert("El banco ya existe.");
        }
    }
});

// Agregar una subcuenta
document.getElementById("agregarSubcuentaBtn").addEventListener("click", function() {
    const bancoSeleccionado = document.getElementById("banco").value;
    if (!bancoSeleccionado) {
        alert("Primero debes seleccionar un banco.");
        return;
    }

    const subcuentaNombre = prompt("Ingrese el nombre de la subcuenta (por ejemplo, tarjeta de crédito, préstamo):");
    if (subcuentaNombre) {
        let bancos = JSON.parse(localStorage.getItem("bancos")) || [];
        const banco = bancos.find(b => b.nombre === bancoSeleccionado);
        if (banco && !banco.subcuentas.includes(subcuentaNombre)) {
            banco.subcuentas.push(subcuentaNombre);
            localStorage.setItem("bancos", JSON.stringify(bancos));
            actualizarSelectSubcuentas(bancoSeleccionado);
            mostrarBancos();
        } else {
            alert("La subcuenta ya existe en este banco.");
        }
    }
});

// Actualizar el select de bancos
function actualizarSelectBancos() {
    const bancos = JSON.parse(localStorage.getItem("bancos")) || [];
    const selectBancos = document.getElementById("banco");
    selectBancos.innerHTML = '<option value="">Seleccionar Banco</option>';  // Limpiar opciones

    bancos.forEach(banco => {
        const option = document.createElement("option");
        option.value = banco.nombre;
        option.textContent = banco.nombre;
        selectBancos.appendChild(option);
    });
}

// Actualizar el select de subcuentas cuando se selecciona un banco
function actualizarSelectSubcuentas(bancoSeleccionado) {
    const bancos = JSON.parse(localStorage.getItem("bancos")) || [];
    const banco = bancos.find(b => b.nombre === bancoSeleccionado);
    const selectSubcuentas = document.getElementById("subcuenta");
    selectSubcuentas.innerHTML = '<option value="">Seleccionar Subcuenta</option>';  // Limpiar opciones

    if (banco) {
        banco.subcuentas.forEach(subcuenta => {
            const option = document.createElement("option");
            option.value = subcuenta;
            option.textContent = subcuenta;
            selectSubcuentas.appendChild(option);
        });
    }
}

// Mostrar los bancos y sus subcuentas
function mostrarBancos() {
    const bancos = JSON.parse(localStorage.getItem("bancos")) || [];
    const listaBancos = document.getElementById("listaBancos");
    listaBancos.innerHTML = '';

    bancos.forEach(banco => {
        const li = document.createElement("li");
        li.textContent = ${banco.nombre} - Subcuentas: ${banco.subcuentas.join(", ")};
        listaBancos.appendChild(li);
    });
}

// Exportar los pagos a Excel
document.getElementById("exportarBtn").addEventListener("click", function() {
    const pagos = JSON.parse(localStorage.getItem("pagos")) || [];
    const ws = XLSX.utils.json_to_sheet(pagos);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Pagos");
    XLSX.writeFile(wb, "registros_pagos.xlsx");
});

// Inicializar la interfaz al cargar la página
actualizarSelectBancos();
mostrarPagos();
mostrarBancos();
