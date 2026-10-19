const express = require('express');
const path = require('path');
const md5 = require('md5');
const { consultar } = require('../bd');
const requiereLogin = require('../middlewares/requiereLogin');

const router = express.Router();
const views = path.join(__dirname, '..', 'views');

router.get('/login', (req, res) => {
  if (req.session.usuario) return res.redirect('/index');
  res.sendFile(path.join(views, 'login.html'));
});

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  if (typeof email !== 'string' || typeof password !== 'string' || !email.trim() || !password) {
    return res.status(400).sendFile(path.join(views, 'error.html'));
  }
  try {
    const usuarios = await consultar('SELECT id, nombre, email, password_hash FROM usuarios WHERE email = ? LIMIT 1', [email.trim()]);
    if (usuarios.length !== 1 || usuarios[0].password_hash !== md5(password)) {
      return res.status(401).sendFile(path.join(views, 'error.html'));
    }
    const usuario = usuarios[0];
    req.session.regenerate(err => {
      if (err) return next(err);
      req.session.usuario = { id: usuario.id, nombre: usuario.nombre, email: usuario.email };
      req.session.save(err => err ? next(err) : res.redirect('/index'));
    });
  } catch (error) { next(error); }
});

router.post('/logout', requiereLogin, (req, res, next) => {
  req.session.destroy(err => {
    if (err) return next(err);
    res.clearCookie('utn.sid', { path: '/' });
    res.redirect('/login');
  });
});

module.exports = router;
