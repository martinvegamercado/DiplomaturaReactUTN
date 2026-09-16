const express = require('express');
const app = express();
const port = 3000;

// Ruta 1: Inicio (Respuesta de texto plano)
app.get('/', (req, res) => {
  res.send('¡Hola! Bienvenido a la página principal de nuestra aplicación en Express.');
});

// Ruta 2: Productos (Respuesta en formato JSON)
app.get('/productos', (req, res) => {
  const productos = [
    { id: 1, nombre: 'Teclado Mecánico', stock: true },
    { id: 2, nombre: 'Monitor 24"', stock: false },
    { id: 3, nombre: 'Mouse Óptico', stock: true }
  ];
  res.json(productos);
});

// Ruta 3: Contacto (Respuesta con HTML)
app.get('/contacto', (req, res) => {
  res.send(`
    <h1>Página de Contacto</h1>
    <p>Puedes escribirnos a <strong>soporte@nuestra-api.com</strong>.</p>
  `);
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});