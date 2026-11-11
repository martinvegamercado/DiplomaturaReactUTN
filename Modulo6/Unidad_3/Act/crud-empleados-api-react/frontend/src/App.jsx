import { useEffect, useState } from 'react';
import { api } from './api.js';

const VACIO = { nombre: '', apellido: '', trabajo: '', edad: '', salario: '', mail: '' };

function App() {
  const [empleados, setEmpleados] = useState([]);
  const [formulario, setFormulario] = useState(VACIO);
  const [idEditar, setIdEditar] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  async function cargar() {
    try {
      setError('');
      setEmpleados(await api.listar());
    } catch (e) {
      setError(e.message);
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => { cargar(); }, []);

  function cambiar(e) {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  }

  function cancelar() {
    setFormulario(VACIO);
    setIdEditar(null);
  }

  function editar(empleado) {
    const { id_emp, ...datos } = empleado;
    setIdEditar(id_emp);
    setFormulario(datos);
    setMensaje('');
    setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function guardar(e) {
    e.preventDefault();
    setGuardando(true);
    setError('');
    setMensaje('');
    const datos = {
      ...formulario,
      edad: Number(formulario.edad),
      salario: Number(formulario.salario)
    };
    try {
      if (idEditar !== null) {
        await api.actualizar(idEditar, datos);
        setMensaje('Empleado actualizado correctamente.');
      } else {
        await api.crear(datos);
        setMensaje('Empleado creado correctamente.');
      }
      cancelar();
      await cargar();
    } catch (e) {
      setError(e.message);
    } finally {
      setGuardando(false);
    }
  }

  async function eliminar(empleado) {
    if (!window.confirm(`¿Eliminar a ${empleado.nombre} ${empleado.apellido}?`)) return;
    setError('');
    setMensaje('');
    try {
      await api.eliminar(empleado.id_emp);
      if (idEditar === empleado.id_emp) cancelar();
      setMensaje('Empleado eliminado correctamente.');
      await cargar();
    } catch (e) {
      setError(e.message);
    }
  }

  const filtrados = empleados.filter(e =>
    `${e.nombre} ${e.apellido} ${e.trabajo} ${e.mail}`.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <main className="contenedor">
      <header>
        <div><p className="subtitulo">Laboratorio UTN · React + API REST + MySQL</p><h1>Administración de empleados</h1></div>
        <span className="contador">{empleados.length} empleados</span>
      </header>
      {error && <p className="alerta error" role="alert">{error}</p>}
      {mensaje && <p className="alerta exito" role="status">{mensaje}</p>}

      <section className="panel">
        <h2>{idEditar === null ? 'Nuevo empleado' : `Editar empleado #${idEditar}`}</h2>
        <form onSubmit={guardar}>
          <div className="campos">
            <label>Nombre<input name="nombre" value={formulario.nombre} onChange={cambiar} maxLength={50} required /></label>
            <label>Apellido<input name="apellido" value={formulario.apellido} onChange={cambiar} maxLength={50} required /></label>
            <label>Trabajo<input name="trabajo" value={formulario.trabajo} onChange={cambiar} maxLength={100} required /></label>
            <label>Edad<input type="number" name="edad" min="1" max="120" value={formulario.edad} onChange={cambiar} required /></label>
            <label>Salario<input type="number" name="salario" min="0" max="2147483647" value={formulario.salario} onChange={cambiar} required /></label>
            <label>Mail<input type="email" name="mail" maxLength={100} value={formulario.mail} onChange={cambiar} required /></label>
          </div>
          <div className="acciones">
            <button type="submit" disabled={guardando}>{guardando ? 'Guardando...' : idEditar === null ? 'Agregar empleado' : 'Guardar cambios'}</button>
            {idEditar !== null && <button type="button" className="secundario" onClick={cancelar}>Cancelar edición</button>}
          </div>
        </form>
      </section>

      <section className="panel">
        <div className="encabezado-tabla"><h2>Listado de empleados</h2><input aria-label="Buscar empleados" placeholder="Buscar por nombre, trabajo o mail..." value={busqueda} onChange={e => setBusqueda(e.target.value)} /></div>
        {cargando ? <p>Cargando empleados...</p> : (
          <div className="tabla-scroll"><table>
            <thead><tr><th>ID</th><th>Nombre</th><th>Apellido</th><th>Trabajo</th><th>Edad</th><th>Salario</th><th>Mail</th><th>Acciones</th></tr></thead>
            <tbody>
              {filtrados.map(emp => <tr key={emp.id_emp}>
                <td>{emp.id_emp}</td><td>{emp.nombre}</td><td>{emp.apellido}</td><td>{emp.trabajo}</td><td>{emp.edad}</td>
                <td>${Number(emp.salario).toLocaleString('es-AR')}</td><td>{emp.mail}</td>
                <td><div className="acciones-fila"><button className="editar" onClick={() => editar(emp)}>Editar</button><button className="borrar" onClick={() => eliminar(emp)}>Eliminar</button></div></td>
              </tr>)}
              {filtrados.length === 0 && <tr><td colSpan="8" className="sin-datos">No hay empleados para mostrar.</td></tr>}
            </tbody>
          </table></div>
        )}
      </section>
    </main>
  );
}

export default App;
