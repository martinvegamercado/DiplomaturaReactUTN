
const { conexion, consultar } = require('./bd');

async function mostrarEmpleados() {
    try {
        const empleados = await consultar(
            'SELECT nombre, trabajo FROM empleados'
        );

        console.table(empleados);
    } catch (error) {
        console.error('Error al consultar empleados:', error.message);
        process.exitCode = 1;
    } finally {
        conexion.end();
    }
}

mostrarEmpleados();
