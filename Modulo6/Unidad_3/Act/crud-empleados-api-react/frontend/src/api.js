const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/empleados';

async function solicitud(ruta = '', opciones = {}) {
  let respuesta;
  try {
    respuesta = await fetch(`${BASE_URL}${ruta}`, {
      ...opciones,
      headers: { 'Content-Type': 'application/json', ...opciones.headers }
    });
  } catch {
    throw new Error('No se pudo conectar con la API. Verificá que Express esté ejecutándose.');
  }
  const datos = await respuesta.json().catch(() => null);
  if (!respuesta.ok) throw new Error(datos?.error || `Error HTTP ${respuesta.status}`);
  return datos;
}

export const api = {
  listar: () => solicitud(),
  obtener: (id) => solicitud(`/${id}`),
  crear: (empleado) => solicitud('', { method: 'POST', body: JSON.stringify(empleado) }),
  actualizar: (id, empleado) => solicitud(`/${id}`, { method: 'PUT', body: JSON.stringify(empleado) }),
  eliminar: (id) => solicitud(`/${id}`, { method: 'DELETE' })
};
