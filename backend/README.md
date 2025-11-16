# Backend - Gestor de Tareas

API RESTful construida con Node.js, Express, TypeScript y Prisma ORM.

## Tecnologías

- **Node.js 20+**
- **TypeScript 5.9**
- **Express 5.1**
- **Prisma ORM 6.19**
- **MySQL 8**
- **JWT** para autenticación
- **Bcrypt** para hash de contraseñas
- **Express Validator** para validaciones

## Prerrequisitos

- Node.js >= 20 & <25
- pnpm >= 10.22.0
- MySQL >= 8.0
- Docker y Docker Compose (opcional pero recomendado)

## Instalación y Configuración

### 1. Instalar dependencias

```bash
pnpm install
```

### 2. Configurar variables de entorno

Renombrar el archivo `.env.example` a `.env` y ajustar los valores según el entorno:

```env
DATABASE_URL=mysql://task_user:taskpassword123@localhost:3306/task_manager
JWT_SECRET=your-super-secret-jwt-key
PORT=3001
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

### 3. Configurar base de datos

```bash
# Generar Prisma Client
pnpm prisma:generate

# Ejecutar migraciones
pnpm prisma:migrate

# (Opcional) Ejecutar seed
pnpm seed
```

### 4. Iniciar servidor

```bash
# Modo desarrollo con hot reload
pnpm dev

# Compilar para producción
pnpm build

# Ejecutar en producción
pnpm start
```

## Docker

### Usando Docker Compose (desde la raíz del proyecto)

```bash
# Construir e iniciar servicios
docker-compose up -d

# Ver logs
docker-compose logs -f backend

# Detener servicios
docker-compose down
```

### Usando Docker Compose (desde ./backend del proyecto)(Recomendado)

El `docker-compose.yml` en el directorio backend levanta MySQL y el backend con **migraciones automáticas**.
```bash
# Desde el directorio backend
docker-compose up -d

# Ver logs
docker-compose logs -f backend

# Detener servicios
docker-compose down

# Detener y eliminar volúmenes (limpia la BD)
docker-compose down -v
```

### ¿Qué hace automáticamente?

1. ✅ Levanta MySQL en el puerto 3307
2. ✅ Espera a que MySQL esté listo (healthcheck)
3. ✅ Ejecuta `prisma migrate deploy` automáticamente
4. ✅ Ejecuta el seed si `NODE_ENV=development` (opcional)
5. ✅ Inicia el servidor en el puerto 3001

### Ventajas sobre el método anterior

| Característica | Scripts SQL (antes) | Migraciones Prisma (ahora) |
|----------------|---------------------|----------------------------|
| **Versionamiento** | Manual | Automático con Prisma |
| **Rollback** | Manual | Con historial de migraciones |
| **Sincronización** | Puede desincronizarse del schema | Siempre sincronizado |
| **Desarrollo** | Editar SQL manualmente | `prisma migrate dev` |
| **Producción** | Scripts ejecutados una vez | `prisma migrate deploy` |

### Comandos útiles
```bash
# Ejecutar comandos dentro del contenedor
docker-compose exec backend sh

# Ver estado de migraciones
docker-compose exec backend npx prisma migrate status

# Aplicar nueva migración (desarrollo)
docker-compose exec backend npx prisma migrate dev --name nombre_migracion

# Ejecutar seed manualmente
docker-compose exec backend npm run seed:prod

# Reiniciar solo el backend
docker-compose restart backend

# Ver logs en tiempo real
docker-compose logs -f backend

# Acceder a MySQL
docker-compose exec mysql mysql -u task_user -p task_manager
```

### Crear nuevas migraciones
```bash
# 1. Modifica el schema.prisma
# 2. Genera la migración (dentro del contenedor)
docker-compose exec backend npx prisma migrate dev --name add_nueva_columna

# O desde tu máquina local (si tienes Node.js)
pnpm prisma migrate dev --name add_nueva_columna

# 3. La migración se aplicará automáticamente al reiniciar
docker-compose restart backend
```

### Variables de entorno

Crea un archivo `.env` en el directorio backend:
```env
MYSQL_ROOT_PASSWORD=root_password
MYSQL_DATABASE=task_manager
MYSQL_USER=task_user
MYSQL_PASSWORD=taskpassword123
MYSQL_PORT=3307
DATABASE_URL=mysql://task_user:taskpassword123@mysql:3306/task_manager
JWT_SECRET=your-super-secret-jwt-key
BACKEND_PORT=3001
NODE_ENV=production
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

### Troubleshooting

#### Error: "Can't connect to MySQL server"
```bash
# Verifica que MySQL esté corriendo
docker-compose ps

# Verifica los logs de MySQL
docker-compose logs mysql

# Reinicia MySQL
docker-compose restart mysql
```

#### Error: "Migration engine error"
```bash
# Elimina volúmenes y vuelve a crear
docker-compose down -v
docker-compose up -d

# O resetea la base de datos
docker-compose exec backend npx prisma migrate reset --force
```

#### Aplicar migraciones manualmente
```bash
# Entrar al contenedor
docker-compose exec backend sh

# Aplicar migraciones
npx prisma migrate deploy

# Ver estado
npx prisma migrate status
```

### Diferencias con el Docker Compose principal
```bash
# Docker Compose principal (raíz del proyecto)
# - Levanta: MySQL, Backend, Frontend, Mobile App
# - Usa: Scripts SQL de inicialización
cd /
docker-compose up -d

# Docker Compose del backend (directorio backend)
# - Levanta: Solo MySQL y Backend
# - Usa: Migraciones de Prisma
cd backend
docker-compose up -d
```

### Solo Backend

```bash
# Construir imagen
docker build -t task-manager-backend .

# Ejecutar contenedor
docker run -p 3001:3001 \
  -e DATABASE_URL=mysql://user:pass@host:3306/db \
  -e JWT_SECRET=your-secret \
  task-manager-backend
```


## Estructura del Proyecto

```
backend/
├── prisma/
│   ├── schema.prisma      # Esquema de base de datos
│   └── seed.ts            # Datos de prueba
├── src/
│   ├── config/            # Configuraciones (CORS, etc)
│   ├── controllers/       # Controladores de rutas
│   ├── dtos/              # Data Transfer Objects
│   ├── middlewares/       # Middlewares (auth, validation, error)
│   ├── repositories/      # Capa de acceso a datos
│   ├── routes/            # Definición de rutas
│   ├── services/          # Lógica de negocio
│   ├── utils/             # Utilidades (jwt, bcrypt)
│   ├── validators/        # Validadores con express-validator
│   ├── prisma/
│   │   └── client.ts      # Cliente Prisma singleton
│   ├── app.ts             # Configuración de Express
│   └── index.ts           # Punto de entrada
├── Dockerfile
├── .dockerignore
├── package.json
└── tsconfig.json
```

## Endpoints de la API

### Autenticación

#### POST `/api/register`
Registrar nuevo usuario.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "status": "success",
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2025-01-01T00:00:00Z",
      "updatedAt": "2025-01-01T00:00:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

#### POST `/api/login`
Iniciar sesión.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "status": "success",
  "message": "Login successful",
  "data": {
    "user": { ... },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

### Tareas (Requieren autenticación)

Todas las rutas de tareas requieren header:
```
Authorization: Bearer <token>
```

#### GET `/api/tasks`
Listar tareas del usuario autenticado.

**Query params (opcional):**
- `status`: PENDING | IN_PROGRESS | COMPLETED

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "tasks": [
      {
        "id": 1,
        "title": "Mi primera tarea",
        "description": "Descripción",
        "status": "PENDING",
        "userId": 1,
        "createdAt": "2025-01-01T00:00:00Z",
        "updatedAt": "2025-01-01T00:00:00Z"
      }
    ],
    "count": 1
  }
}
```

#### GET `/api/tasks/:id`
Obtener tarea específica.

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "task": { ... }
  }
}
```

#### POST `/api/tasks`
Crear nueva tarea.

**Request Body:**
```json
{
  "title": "Nueva tarea",
  "description": "Descripción opcional",
  "status": "PENDING"
}
```

**Response (201):**
```json
{
  "status": "success",
  "message": "Task created successfully",
  "data": {
    "task": { ... }
  }
}
```

#### PUT `/api/tasks/:id`
Actualizar tarea.

**Request Body:**
```json
{
  "title": "Título actualizado",
  "status": "IN_PROGRESS"
}
```

**Response (200):**
```json
{
  "status": "success",
  "message": "Task updated successfully",
  "data": {
    "task": { ... }
  }
}
```

#### DELETE `/api/tasks/:id`
Eliminar tarea.

**Response (200):**
```json
{
  "status": "success",
  "message": "Task deleted successfully"
}
```

### Health Check

#### GET `/health`
Verificar estado del servidor.

**Response (200):**
```json
{
  "status": "ok",
  "timestamp": "2025-01-01T00:00:00.000Z"
}
```

## Seguridad

- ✅ Autenticación JWT
- ✅ Contraseñas hasheadas con bcrypt (10 rounds)
- ✅ CORS configurado
- ✅ Validación de inputs
- ✅ Rate limiting (pendiente)
- ✅ Headers de seguridad (pendiente helmet)

## Testing

**Importante:** Las pruebas unitarias e de integración están configuradas para funcionar correctamente en versiones de Node.js inferiores a la 25.

### Comandos

```bash
# Ejecutar todos los tests
pnpm test

# Ejecutar tests y generar reporte de cobertura
pnpm test:coverage

# Ejecutar tests en modo "watch" para desarrollo
pnpm test:watch
```

### Estructura de Tests

El directorio `src/__tests__` contiene todas las pruebas del proyecto, organizadas de la siguiente manera:

```
src/__tests__/
├── setup.ts              # Configuración inicial para tests (ej. mocks)
├── integration/          # Pruebas de integración (end-to-end)
│   ├── auth.test.ts
│   └── tasks.test.ts
├── middlewares/          # Pruebas unitarias para middlewares
│   └── auth.middleware.test.ts
├── services/             # Pruebas unitarias para la lógica de negocio
│   ├── auth.service.test.ts
│   └── task.service.test.ts
└── utils/                # Pruebas unitarias para funciones de utilidad
    ├── bcrypt.test.ts
    └── jwt.test.ts
```

- **Pruebas de Integración**: Verifican el flujo completo de las rutas de la API, desde la solicitud HTTP hasta la respuesta, interactuando con una base de datos de prueba.
- **Pruebas Unitarias**: Aíslan y comprueban componentes específicos (servicios, middlewares, utilidades) usando mocks para simular dependencias.

## Scripts Disponibles

```bash
pnpm dev              # Desarrollo con hot reload
pnpm build            # Compilar TypeScript
pnpm start            # Ejecutar en producción
pnpm prisma:generate  # Generar Prisma Client
pnpm prisma:migrate   # Ejecutar migraciones
pnpm prisma:studio    # Abrir Prisma Studio
pnpm seed             # Ejecutar seed (desarrollo)
pnpm seed:prod        # Ejecutar seed (producción)
pnpm test             # Ejecuta los tests
pnpm test:coverage    # Ejecutar tests y generar reporte de cobertura
pnpm test:watch       # Ejecutar tests en modo "watch" para desarrollo
pnpm test:unit        # Ejecuta solo los test unitarios
pnpm test:integration # Ejecuta solo los test de integracion
```

## Arquitectura

El proyecto sigue el patrón **Repository + Service Layer** con principios SOLID:

- **Controllers**: Manejan requests/responses HTTP
- **Services**: Contienen lógica de negocio
- **Repositories**: Abstraen acceso a datos
- **DTOs**: Definen estructura de datos de entrada/salida
- **Validators**: Validan datos de entrada
- **Middlewares**: Procesan requests (auth, validation, errors)

## Troubleshooting

### Error de conexión a MySQL

Verificar que MySQL esté corriendo:
```bash
# Con Docker
docker ps | grep mysql

# Ver logs
docker logs mysql_db
```

### Error de Prisma Client

Regenerar cliente:
```bash
pnpm prisma:generate
```

### Puertos ocupados

Cambiar puerto en `.env`:
```env
PORT=3002
```

## Notas
- Los triggers de auditoría registran automáticamente todos los cambios en tareas
- Se agregó un script funcional tanto para generar la base de datos como para ejecutar un seed de pruebas en el entorno de desarrollo.
  Sin embargo, se consideró que utilizar una base de datos ya existente, con sus tablas y reglas previamente definidas, es una opción más adecuada para el entorno de despliegue de la aplicación.