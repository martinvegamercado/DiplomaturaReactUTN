
require('dotenv').config();

const express = require('express');
const path = require('path');

const empleadosRoutes = require('./routes/empleados');

const app = express();

// Motor de plantillas Handlebars
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Formularios HTML
app.use(express.urlencoded({ extended: false }));

// Archivos CSS
app.use(express.static(path.join(__dirname, 'public')));

// Rutas de empleados
app.use('/empleados', empleadosRoutes);

// Redirigir el inicio al listado
app.get('/', (req, res) => {
    res.redirect('/empleados');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});
