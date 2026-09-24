var express = require('express');
var router = express.Router();

/* GET: Mostrar un formulario al usuario */
router.get('/', function(req, res, next) {
  res.send(`
    <h1>Ingreso de Datos</h1>
    <form action="/guardar-dato" method="POST">
      <input type="text" name="nombreUsuario" placeholder="Ingresa tu nombre" required>
      <button type="submit">Guardar en Sesión</button>
    </form>
    <br>
    <a href="/perfil">Ver variable de sesión</a>
  `);
});

/* POST: Capturar el dato y guardarlo en req.session */
router.post('/guardar-dato', function(req, res, next) {
  // Capturamos el dato enviado desde el formulario
  const nombreCapturado = req.body.nombreUsuario; 
  
  // Guardamos el dato en una variable de sesión
  req.session.usuarioLogueado = nombreCapturado; 
  
  res.send(`
    <p>¡Dato capturado y guardado con éxito!</p>
    <a href="/perfil">Ir a ver mi perfil</a>
  `);
});

/* GET: Leer y mostrar el dato de la variable de sesión */
router.get('/perfil', function(req, res, next) {
  // Verificamos si la variable de sesión existe
  if (req.session.usuarioLogueado) {
    res.send(`
      <h1>Perfil del Usuario</h1>
      <p>Bienvenido, <strong>${req.session.usuarioLogueado}</strong>. Este dato está siendo leído desde la sesión.</p>
      <a href="/">Volver al inicio</a>
    `);
  } else {
    res.send(`
      <p>No hay datos guardados en la sesión actualmente.</p>
      <a href="/">Volver al formulario</a>
    `);
  }
});

module.exports = router;
