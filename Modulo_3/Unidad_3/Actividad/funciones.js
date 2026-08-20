// ==========================================
// Ejercicio 1: Promedio de notas
// ==========================================

function calcularPromedio(nota1, nota2) {
    return (nota1 + nota2) / 2;
}

// Variables para la materia Historia
let notaParcial1 = 6;
let notaParcial2 = 9;
let promedioHistoria = calcularPromedio(notaParcial1, notaParcial2);

// Mostramos el resultado en la consola del navegador
console.log(`El promedio de Historia es: ${promedioHistoria}`);

// Identificamos el elemento en el HTML donde vamos a mostrar el resultado
const mostrarPromedio = document.getElementById('resultado-promedio');

// Escribimos el resultado directamente en la página
mostrarPromedio.textContent = `El promedio de Historia es: ${promedioHistoria}`;



// ==========================================
// Ejercicio 2: Contador de caracteres
// ==========================================

// 1. Identificamos los elementos del DOM (del archivo HTML)
const textarea = document.getElementById('texto-entrada');
const contador = document.getElementById('contador');

// 2. Escuchamos el evento 'input' para detectar cada vez que se escribe
textarea.addEventListener('input', function() {
    // 3. Actualizamos el contador con la longitud del texto actual
    contador.textContent = textarea.value.length;
});