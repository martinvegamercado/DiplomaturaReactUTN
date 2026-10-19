# Actividad UTN — Login y Logout con Express y MySQL

Sistema de autenticación educativo con `express`, `express-session`, `mysql2`, `util`, `md5` y `dotenv`.

## Requisitos
- Node.js y npm
- Servidor MySQL activo

## Instalación
1. Ejecutá el script `sql/database.sql` en MySQL Workbench (o consola MySQL).
2. Desde la carpeta del proyecto ejecutá `npm install`.
3. Copiá `.env.example` a `.env`, configurá tu usuario/contraseña MySQL y reemplazá `SESSION_SECRET` por un secreto largo y aleatorio.
4. Ejecutá `npm run seed` para generar el usuario de prueba.
5. Ejecutá `npm run dev` (o `npm start`).
6. Abrí `http://localhost:3000/login`.

**Usuario demo:** `admin@utn.com` **Contraseña demo:** `123456`.

> MD5 se utiliza exclusivamente porque forma parte de la consigna. MD5 **no es seguro** para contraseñas reales. En producción, usar Argon2id/bcrypt, HTTPS, un almacenamiento persistente de sesiones, protección CSRF y limitación de intentos.

## Organización de carpetas
- `app.js`: configura Express, sesiones y monta los routers.
- `routes/auth.js`: GET/POST `/login` y POST `/logout`.
- `routes/index.js`: GET `/` y GET `/index`.
- `middlewares/requiereLogin.js`: permite proteger cualquier ruta privada.
- `views/`: páginas HTML; `public/`: estilos; `bd.js`: conexión MySQL.

## Rutas
| Ruta | Método | Función |
|---|---|---|
| `/` | GET | Redirige a login o index |
| `/login` | GET | Muestra formulario |
| `/login` | POST | Valida credenciales y crea sesión |
| `/index` | GET | Página privada, solo con sesión |
| `/logout` | POST | Destruye sesión y redirige a login |

## Integración al proyecto
Reemplazá el contenido de `views/index.html` por tu página, o montá tus rutas existentes con el middleware `requiereLogin` importándolo desde `middlewares/requiereLogin.js`. Si ya usás Express, trasladá la configuración de sesión y estas rutas a tu `app.js` existente en vez de correr dos servidores.

## Publicar en GitHub
Creá un repositorio **público** vacío en GitHub y, dentro del proyecto, ejecutá:
```bash
git init
git add .
git commit -m "Actividad UTN: login, sesiones y logout"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/login-utn-express.git
git push -u origin main
```
Copiá y entregá la URL `https://github.com/TU_USUARIO/login-utn-express` una vez que hayas hecho el push.

**Importante:** `.env` está excluido mediante `.gitignore`; no publiques credenciales reales. El repositorio incluye únicamente `.env.example`.

## Lista de verificación
- [ ] Login válido lleva a `/index`
- [ ] Login inválido muestra error
- [ ] `/index` sin sesión redirige a `/login`
- [ ] Logout destruye la sesión
- [ ] Después del logout `/index` vuelve a redirigir al login
- [ ] Repositorio público en GitHub sin `.env`
