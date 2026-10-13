
require('dotenv').config();

const mysql = require('mysql2');
const util = require('util');

// Configuración de la conexión a MySQL
const conexion = mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Convertir query para trabajar con async/await
const consultar = util.promisify(conexion.query).bind(conexion);

// Exportar la conexión y la función de consulta
module.exports = {
    conexion,
    consultar
};
