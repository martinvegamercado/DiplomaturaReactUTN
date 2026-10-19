require('dotenv').config();
const md5 = require('md5');
const { pool, consultar } = require('./bd');

(async () => {
  const email = 'admin@utn.com';
  const password = '123456'; // Clave
  await consultar(
    `INSERT INTO usuarios (nombre, email, password_hash)
     VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE nombre = VALUES(nombre), password_hash = VALUES(password_hash)`,
    ['Administrador', email, md5(password)]
  );
  console.log(`Usuario demo: ${email} / ${password}`);
})().catch(err => { console.error('Error al cargar usuario:', err.message); process.exitCode = 1; })
  .finally(() => pool.end());
