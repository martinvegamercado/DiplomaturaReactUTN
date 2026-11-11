const express = require('express');
const bd = require('../bd');
const router = express.Router();

function obtenerId(req, res) {
  const id = Number(req.params.id);
  if (!Number.isSafeInteger(id) || id <= 0) {
    res.status(400).json({ error: 'El ID debe ser un entero positivo' });
    return null;
  }
  return id;
}

function validarEmpleado(datos) {
  if (!datos || typeof datos !== 'object' || Array.isArray(datos)) return 'Datos inválidos';
  const limites = { nombre: 50, apellido: 50, trabajo: 100, mail: 100 };
  for (const [campo, max] of Object.entries(limites)) {
    if (typeof datos[campo] !== 'string' || !datos[campo].trim() || datos[campo].trim().length > max) {
      return `${campo} es obligatorio y admite hasta ${max} caracteres`;
    }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.mail.trim())) return 'Mail inválido';
  if (!Number.isInteger(datos.edad) || datos.edad < 1 || datos.edad > 120) return 'Edad inválida';
  if (!Number.isSafeInteger(datos.salario) || datos.salario < 0 || datos.salario > 2147483647) return 'Salario inválido';
  return null;
}

function valoresEmpleado(datos) {
  return [datos.nombre.trim(), datos.apellido.trim(), datos.trabajo.trim(), datos.edad, datos.salario, datos.mail.trim()];
}

// READ: listar
router.get('/', async (req, res, next) => {
  try {
    const [filas] = await bd.query('SELECT * FROM empleados ORDER BY id_emp');
    res.json(filas);
  } catch (error) { next(error); }
});

// READ: consultar uno
router.get('/:id', async (req, res, next) => {
  const id = obtenerId(req, res);
  if (id === null) return;
  try {
    const [filas] = await bd.execute('SELECT * FROM empleados WHERE id_emp = ?', [id]);
    if (!filas.length) return res.status(404).json({ error: 'Empleado no encontrado' });
    res.json(filas[0]);
  } catch (error) { next(error); }
});

// CREATE
router.post('/', async (req, res, next) => {
  const error = validarEmpleado(req.body);
  if (error) return res.status(400).json({ error });
  try {
    const [resultado] = await bd.execute(
      'INSERT INTO empleados (nombre, apellido, trabajo, edad, salario, mail) VALUES (?, ?, ?, ?, ?, ?)',
      valoresEmpleado(req.body)
    );
    const [filas] = await bd.execute('SELECT * FROM empleados WHERE id_emp = ?', [resultado.insertId]);
    res.status(201).json(filas[0]);
  } catch (error) { next(error); }
});

// UPDATE
router.put('/:id', async (req, res, next) => {
  const id = obtenerId(req, res);
  if (id === null) return;
  const error = validarEmpleado(req.body);
  if (error) return res.status(400).json({ error });
  try {
    const [resultado] = await bd.execute(
      'UPDATE empleados SET nombre=?, apellido=?, trabajo=?, edad=?, salario=?, mail=? WHERE id_emp=?',
      [...valoresEmpleado(req.body), id]
    );
    if (!resultado.affectedRows) return res.status(404).json({ error: 'Empleado no encontrado' });
    const [filas] = await bd.execute('SELECT * FROM empleados WHERE id_emp = ?', [id]);
    res.json(filas[0]);
  } catch (error) { next(error); }
});

// DELETE
router.delete('/:id', async (req, res, next) => {
  const id = obtenerId(req, res);
  if (id === null) return;
  try {
    const [resultado] = await bd.execute('DELETE FROM empleados WHERE id_emp = ?', [id]);
    if (!resultado.affectedRows) return res.status(404).json({ error: 'Empleado no encontrado' });
    res.json({ mensaje: 'Empleado eliminado', id_emp: id });
  } catch (error) { next(error); }
});

module.exports = router;
