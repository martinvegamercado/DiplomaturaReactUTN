require('dotenv').config();
const express = require('express');
const cors = require('cors');
const empleadosRoutes = require('./routes/empleados');

const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }));
app.use(express.json());
app.get('/', (req, res) => res.json({ mensaje: 'API de empleados', endpoints: '/api/empleados' }));
app.use('/api/empleados', empleadosRoutes);
app.use((req, res) => res.status(404).json({ error: 'Ruta no encontrada' }));
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

const PORT = Number(process.env.PORT || 3000);
app.listen(PORT, () => console.log(`API disponible en http://localhost:${PORT}`));
