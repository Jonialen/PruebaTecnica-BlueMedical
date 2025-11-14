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

- Node.js >= 20
- pnpm >= 10.22.0
- MySQL >= 8.0
- Docker y Docker Compose (opcional)

## Instalación y Configuración

### 1. Instalar dependencias

```bash
pnpm install
```

### 2. Configurar variables de entorno

Crear archivo `.env` en la raíz del proyecto backend:

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

```bash
# Ejecutar tests
pnpm test

# Tests con coverage
pnpm test:coverage

# Tests en watch mode
pnpm test:watch
```

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

- Usuario demo: `demo@roble.com` / `123456` (después de ejecutar seed)
- El servidor valida ownership de tareas (403 si intentas acceder a tareas de otro usuario)
- Los triggers de auditoría registran automáticamente todos los cambios en tareas