const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Endpoint para registrar usuario
app.post('/api/usuarios', async (req, res) => {
  const { nombre, apellido, edad, materia } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO usuarios (nombre, apellido, edad, materia) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, apellido, edad, materia]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint para obtener todos los usuarios
app.get('/api/usuarios', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM usuarios ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor backend en puerto ${PORT}`));