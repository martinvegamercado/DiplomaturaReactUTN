// --- Ejercicio 1 ---
const alumnos = [
    { nombre: 'Juan Gomez', nota: 7 },
    { nombre: 'Pedro Rodriguez', nota: 4 },
    { nombre: 'Roxana García', nota: 8 },
    { nombre: 'Luciano Lopez', nota: 5 },
    { nombre: 'Fernanda Gimenez', nota: 6 },
    { nombre: 'Florencia Martinez', nota: 10 },
    { nombre: 'Raul Sanchez', nota: 7 },
    { nombre: 'Sandra Figueroa', nota: 8 }
];

// Utilización de método de array (filter) para filtrar notas >= 7
const alumnosAprobados = alumnos.filter(alumno => alumno.nota >= 7);

// Renderizado en el DOM
const listaAprobados = document.getElementById('lista-aprobados');
alumnosAprobados.forEach(alumno => {
    const li = document.createElement('li');
    li.innerHTML = `${alumno.nombre} - Nota: <span class="result">${alumno.nota}</span>`;
    listaAprobados.appendChild(li);
});

console.log("--- Ejercicio 1: Alumnos Aprobados ---");
console.log(alumnosAprobados);


// --- Ejercicio 2 ---
const producto = {
    id: 123,
    nombre: "Auriculares inalámbricos",
    precio: 120000,
    stock: 25,
    categoria: "Electrónica"
};

// a) Desestructuración de objetos
const { nombre, precio, stock } = producto;

// b) Mostrar en consola
console.log("--- Ejercicio 2: Detalles del Producto ---");
console.log(`Nombre: ${nombre}`);
console.log(`Precio: $${precio}`);
console.log(`Stock disponible: ${stock}`);

// Renderizado en el DOM
const detalleProducto = document.getElementById('detalle-producto');
detalleProducto.innerHTML = `
    <ul>
        <li>Nombre del producto: <span class="result">${nombre}</span></li>
        <li>Precio: <span class="result">$${precio}</span></li>
        <li>Stock disponible: <span class="result">${stock} unidades</span></li>
    </ul>
`;