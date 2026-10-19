const express = require('express');
const fs = require('fs');
const path = require('path');
const requiereLogin = require('../middlewares/requiereLogin');

const router = express.Router();

function escaparHtml(value) {
  return String(value).replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[c]);
}

router.get('/', (req, res) => res.redirect(req.session.usuario ? '/index' : '/login'));

router.get('/index', requiereLogin, (req, res) => {
  const plantilla = fs.readFileSync(path.join(__dirname, '..', 'views', 'index.html'), 'utf8');
  res.send(plantilla.replaceAll('{{NOMBRE}}', escaparHtml(req.session.usuario.nombre))
    .replaceAll('{{EMAIL}}', escaparHtml(req.session.usuario.email)));
});

module.exports = router;
