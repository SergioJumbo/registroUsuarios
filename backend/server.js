const express = require('express');
const { Pool } = require('pg');
const app = express();
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'usuario',
  password: process.env.DB_PASSWORD || 'secreta',
  database: process.env.DB_NAME || 'registros',
});

pool.query(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    apellido VARCHAR(100),
    edad INT,
    materia VARCHAR(100)
  )
`).catch(err => console.error('Error al crear la tabla:', err));

// Obtener todos los usuarios
app.get('/api/usuarios', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM usuarios ORDER BY id DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

// Guardar un usuario (debe coincidir con el frontend)
app.post('/api/usuarios', async (req, res) => {
  const { nombre, apellido, edad, materia } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO usuarios (nombre, apellido, edad, materia) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, apellido, edad, materia]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al guardar en PostgreSQL:', error);
    res.status(500).json({ error: 'Error al guardar en la base de datos' });
  }
});

app.listen(3000, () => {
  console.log('Backend en http://localhost:3000');
});
