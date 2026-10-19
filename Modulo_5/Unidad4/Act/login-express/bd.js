require('dotenv').config();
const mysql = require('mysql2');
const { promisify } = require('util');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'login_utn',
  waitForConnections: true,
  connectionLimit: 10
});
const consultar = promisify(pool.query).bind(pool);
module.exports = { pool, consultar };
