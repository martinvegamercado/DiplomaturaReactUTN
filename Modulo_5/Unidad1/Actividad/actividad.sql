-- ============================================
-- Base de datos: actividad
-- Tabla: empleados
-- Motor: MySQL
-- ============================================

DROP DATABASE IF EXISTS ejercicio;

CREATE DATABASE ejercicio
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE ejercicio;

CREATE TABLE empleados (
    id_emp   INT AUTO_INCREMENT PRIMARY KEY,
    nombre   VARCHAR(50)  NOT NULL,
    apellido VARCHAR(50)  NOT NULL,
    trabajo  VARCHAR(100) NOT NULL,
    edad     INT          NOT NULL,
    salario  INT          NOT NULL,
    mail     VARCHAR(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO empleados (id_emp, nombre, apellido, trabajo, edad, salario, mail) VALUES
(1,  'Juan',      'Hagan',     'Programador Senior',         32, 1200000, 'juan_hagan@bignet.com'),
(2,  'Gonzalo',   'Pillai',    'Programador Senior',         32, 1100000, 'g_pillai@bignet.com'),
(3,  'Ana',       'Dharma',    'Desarrollador Web',          27,  900000, 'ana@bignet.com'),
(4,  'Maria',     'Anchor',    'Desarrollador Web',          26,  850000, 'mary@bignet.com'),
(5,  'Alfred',    'Fernandez', 'Programador',                31,  750000, 'af@bignet.com'),
(6,  'Juan',      'Agüero',    'Programador',                36,  850000, 'juan@bignet.com'),
(7,  'Eduardo',   'Sacan',     'Programador',                25,  850000, 'eddi@bignet.com'),
(8,  'Alejandro', 'Nanda',     'Programador',                32,  700000, 'alenanda@bignet.com'),
(9,  'Hernan',    'Rosso',     'Especialista Multimedia',    33,  900000, 'hernan@bignet.com'),
(10, 'Pablo',     'Simon',     'Especialista Multimedia',    43,  850000, 'ps@bignet.com'),
(11, 'Arturo',    'Hernandez', 'Especialista Multimedia',    32,  750000, 'arturo@bignet.com'),
(12, 'Jimena',    'Cazado',    'Diseñador Web',              32, 1100000, 'jimena@bignet.com'),
(13, 'Roberto',   'Luis',      'Administrador de sistemas',  35, 1000000, 'roberto@bignet.com'),
(14, 'Daniel',    'Gutierrez', 'Administrador de sistemas',  34,   90000, 'daniel@bignet.com'),
(15, 'Miguel',    'Harper',    'Ejecutivo de Ventas Senior', 36, 1200000, 'miguel@bignet.com'),
(16, 'Monica',    'Sanchez',   'Ejecutivo de ventas',        30,  900000, 'monica@bignet.com'),
(17, 'Alicia',    'Simlai',    'Ejecutivo de ventas',        27,  700000, 'alicia@bignet.com'),
(18, 'Jose',      'Iriarte',   'Ejecutivo de ventas',        27,  720000, 'jose@bignet.com'),
(19, 'Sabrina',   'Allende',   'Gerente de Soporte tecnico', 32, 2000000, 'sabrina@bignet.com'),
(20, 'Pedro',     'Campeon',   'Gerente de finanzas',        36, 2200000, 'pedro@bignet.com'),
(21, 'Mariano',   'Dharma',    'Presidente',                 28, 3000000, 'mariano@bignet.com');
