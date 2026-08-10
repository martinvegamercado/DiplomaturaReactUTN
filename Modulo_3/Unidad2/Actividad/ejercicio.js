// Ejercicio 1

let producto = 'Laptop';
const precio = 1500000; // Asignamos un precio (tipo number)
const disponible = true; // Asignamos disponibilidad (tipo boolean)

// Imprimimos en consola usando interpolación de strings
console.log(`El ${producto} cuesta ${precio} y su disponibilidad es: ${disponible}.`);


const distancia = 15000; 
let medioDeTransporte = "";

if (distancia >= 0 && distancia <= 1000) {
    medioDeTransporte = "pie";
} else if (distancia > 1000 && distancia <= 10000) {
    medioDeTransporte = "bicicleta";
} else if (distancia > 10000 && distancia <= 30000) {
    medioDeTransporte = "colectivo";
} else if (distancia > 30000 && distancia <= 100000) {
    medioDeTransporte = "auto";
} else if (distancia > 100000) {
    medioDeTransporte = "avion";
} else {
    medioDeTransporte = "Distancia no válida"; // Para contemplar números negativos
}

console.log(`Para una distancia de ${distancia} metros, te sugiero ir en: ${medioDeTransporte}`);


const listaDeCompras = ["yerba", "café", "pan", "leche"];

// El bucle recorre cada elemento del array
for (let i = 0; i < listaDeCompras.length; i++) {
    console.log(`¡No te olvides de comprar ${listaDeCompras[i]}!`);
}




const numeros = [23, 56, 12, 89, 4, 102, 34];

// Asignamos el primer elemento del array como el mayor inicial
let numeroMayor = numeros[0]; 

// Arrancamos el bucle desde la posición 1, ya que la 0 ya la tenemos
for (let i = 1; i < numeros.length; i++) {
    if (numeros[i] > numeroMayor) {
        numeroMayor = numeros[i]; // Si encontramos uno más grande, lo pisamos
    }
}


console.log(`El número mayor del array es: ${numeroMayor}`);