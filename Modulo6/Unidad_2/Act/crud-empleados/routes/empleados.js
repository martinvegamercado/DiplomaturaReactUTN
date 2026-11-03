const express = require('express');
const router = express.Router();
const bd = require('../bd');

function idValido(valor) {
  const id = Number(valor);
  return Number.isSafeInteger(id) && id > 0 ? id : null;
}

function validarEmpleado(datos) {
  const nombre = String(datos.nombre || '').trim();
  const apellido = String(datos.apellido || '').trim();
  const trabajo = String(datos.trabajo || '').trim();
  const mail = String(datos.mail || '').trim();
  const edad = Number(datos.edad);
  const salario = Number(datos.salario);
  if (!nombre || nombre.length > 50 || !apellido || apellido.length > 50 ||
      !trabajo || trabajo.length > 100 || !mail || mail.length > 100 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail) ||
      !Number.isInteger(edad) || edad < 1 || edad > 120 ||
      !Number.isSafeInteger(salario) || salario < 0 || salario > 2147483647) {
    return null;
  }
  return { nombre, apellido, trabajo, edad, salario, mail };
}

function errorServidor(res, error) {
  console.error(error);
  return res.status(500).send('Error interno. Revisá la terminal del servidor.');
}

// READ: listar empleados
router.get('/', async (req, res) => {
  try {
    const [empleados] = await bd.query('SELECT * FROM empleados ORDER BY id_emp');
    res.render('listar', { empleados, cantidad: empleados.length });
  } catch (error) {
    errorServidor(res, error);
  }
});

// CREATE: mostrar formulario
router.get('/nuevo', (req, res) => {
  res.render('formulario', {
    titulo: 'Nuevo empleado',
    accion: '/empleados/nuevo',
    textoBoton: 'Crear empleado'
  });
});

// CREATE: insertar empleado
router.post('/nuevo', async (req, res) => {
  const empleado = validarEmpleado(req.body);
  if (!empleado) {
    return res.status(400).render('formulario', {
      titulo: 'Nuevo empleado', accion: '/empleados/nuevo',
      textoBoton: 'Crear empleado', empleado: req.body,
      error: 'Revisá los datos. Todos los campos son obligatorios.'
    });
  }
  try {
    const { nombre, apellido, trabajo, edad, salario, mail } = empleado;
    await bd.execute(
      'INSERT INTO empleados (nombre, apellido, trabajo, edad, salario, mail) VALUES (?, ?, ?, ?, ?, ?)',
      [nombre, apellido, trabajo, edad, salario, mail]
    );
    res.redirect('/empleados');
  } catch (error) {
    errorServidor(res, error);
  }
});

// UPDATE: mostrar formulario con datos del empleado
router.get('/editar/:id', async (req, res) => {
  const id = idValido(req.params.id);
  if (!id) return res.status(400).send('ID inválido');
  try {
    const [filas] = await bd.execute('SELECT * FROM empleados WHERE id_emp = ?', [id]);
    if (filas.length === 0) return res.status(404).send('Empleado no encontrado');
    res.render('formulario', {
      titulo: 'Editar empleado', accion: `/empleados/editar/${id}`,
      textoBoton: 'Guardar cambios', empleado: filas[0]
    });
  } catch (error) {
    errorServidor(res, error);
  }
});

// UPDATE: guardar cambios
router.post('/editar/:id', async (req, res) => {
  const id = idValido(req.params.id);
  if (!id) return res.status(400).send('ID inválido');
  const empleado = validarEmpleado(req.body);
  if (!empleado) {
    return res.status(400).render('formulario', {
      titulo: 'Editar empleado', accion: `/empleados/editar/${id}`,
      textoBoton: 'Guardar cambios', empleado: req.body,
      error: 'Revisá los datos. Todos los campos son obligatorios.'
    });
  }
  try {
    const { nombre, apellido, trabajo, edad, salario, mail } = empleado;
    const [resultado] = await bd.execute(
      'UPDATE empleados SET nombre = ?, apellido = ?, trabajo = ?, edad = ?, salario = ?, mail = ? WHERE id_emp = ?',
      [nombre, apellido, trabajo, edad, salario, mail, id]
    );
    if (resultado.affectedRows === 0) return res.status(404).send('Empleado no encontrado');
    res.redirect('/empleados');
  } catch (error) {
    errorServidor(res, error);
  }
});

// DELETE: eliminar empleado
router.post('/eliminar/:id', async (req, res) => {
  const id = idValido(req.params.id);
  if (!id) return res.status(400).send('ID inválido');
  try {
    const [resultado] = await bd.execute('DELETE FROM empleados WHERE id_emp = ?', [id]);
    if (resultado.affectedRows === 0) return res.status(404).send('Empleado no encontrado');
    res.redirect('/empleados');
  } catch (error) {
    errorServidor(res, error);
  }
});

module.exports = router;
