require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const authRoutes = require('./routes/auth');
const indexRoutes = require('./routes/index');

const app = express();
const PORT = Number(process.env.PORT || 3000);
if (!process.env.SESSION_SECRET || process.env.SESSION_SECRET === 'reemplazar_por_una_cadena_larga_aleatoria') {
  throw new Error('Configurá SESSION_SECRET con un valor aleatorio fuerte en .env');
}

app.disable('x-powered-by');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  name: 'utn.sid',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60
  }
}));

app.use(authRoutes);
app.use(indexRoutes);

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send('Ocurrió un error interno. Revisá la consola del servidor.');
});
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
