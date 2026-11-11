# CRUD empleados — API REST Express + React + MySQL

## 1. Base de datos

En MySQL Workbench importar `actividad.sql` si no existe la base. **ATENCIÓN:** ese script tiene `DROP DATABASE IF EXISTS ejercicio`, por lo que borra la base y sus datos anteriores.

```sql
USE ejercicio;
SELECT * FROM empleados;
```

La tabla es `empleados(id_emp, nombre, apellido, trabajo, edad, salario, mail)` y trae 21 registros.

## 2. Backend

Abrir una terminal:

```bash
cd backend
npm install
```

Copiar `.env.example` a `.env` y configurar DB_USER / DB_PASSWORD. Ejecutar:

```bash
npm run dev
```

API: http://localhost:3000/api/empleados

### Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/empleados` | Lista todos |
| GET | `/api/empleados/:id` | Busca por ID |
| POST | `/api/empleados` | Crea (JSON) |
| PUT | `/api/empleados/:id` | Actualiza (JSON) |
| DELETE | `/api/empleados/:id` | Elimina |

JSON para POST y PUT:

```json
{
  "nombre": "Laura",
  "apellido": "Pérez",
  "trabajo": "Analista de datos",
  "edad": 29,
  "salario": 850000,
  "mail": "laura@example.com"
}
```

La API responde 201 al crear, 400 ante datos inválidos, 404 si falta empleado y 500 ante errores internos. No devuelve contraseñas de MySQL.

## 3. Frontend

Abrir **otra terminal**:

```bash
cd frontend
npm install
npm run dev
```

Navegar a http://localhost:5173. Si cambiás el puerto del backend, creá `frontend/.env` desde `.env.example` y ajustá VITE_API_URL. Para otros puertos de frontend, cambiá `FRONTEND_URL` en `backend/.env`.

## 4. Pruebas

1. Abrir `http://localhost:3000/api/empleados` y comprobar el JSON.
2. Abrir `http://localhost:5173` y comprobar que se ven los empleados.
3. Crear uno y verificarlo en React y MySQL.
4. Editar ese empleado y verificar el UPDATE.
5. Eliminar el empleado de prueba y comprobar que desapareció.
6. Intentar un mail inválido o una edad negativa y comprobar las validaciones.

## Flujo

React (fetch) → Express (REST/JSON) → mysql2 → MySQL `ejercicio.empleados`.

**Nota:** ejercicio local. 