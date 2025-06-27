import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    edad: '',
    materia: ''
  })
  const [registros, setRegistros] = useState([])

  // Cargar registros al iniciar
  useEffect(() => {
    fetch('/api/usuarios')
      .then(res => res.json())
      .then(data => setRegistros(data))
      .catch(() => setRegistros([]))
  }, [])

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (response.ok) {
        const nuevoRegistro = await response.json();
        setRegistros([nuevoRegistro, ...registros]);
        setForm({
          nombre: '',
          apellido: '',
          edad: '',
          materia: ''
        });
      }
    } catch (error) {
      alert('Error al registrar usuario');
    }
  }

  return (
    <div className="container">
      <div className="formulario">
        <h2>Registro de Usuario</h2>
        <form id="registroForm" onSubmit={handleSubmit}>
          <input
            type="text"
            id="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            id="apellido"
            placeholder="Apellido"
            value={form.apellido}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            id="edad"
            placeholder="Edad"
            value={form.edad}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            id="materia"
            placeholder="Materia"
            value={form.materia}
            onChange={handleChange}
            required
          />
          <button type="submit">Registrar</button>
        </form>
      </div>

      <div className="tabla">
        <h2>Registros</h2>
        <table id="tablaRegistros">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Edad</th>
              <th>Materia</th>
            </tr>
          </thead>
          <tbody>
            {registros.map((registro, idx) => (
              <tr key={idx}>
                <td>{registro.nombre}</td>
                <td>{registro.apellido}</td>
                <td>{registro.edad}</td>
                <td>{registro.materia}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App 