CREATE DATABASE IF NOT EXISTS login_utn CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE login_utn;
CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password_hash CHAR(32) NOT NULL,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Usuario de demostración: crear usando `npm run seed`.
