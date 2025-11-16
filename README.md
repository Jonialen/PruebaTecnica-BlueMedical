# 📋 Gestor de Tareas Full Stack

Sistema completo de gestión de tareas con arquitectura de microservicios, que incluye aplicación web, móvil y API REST.

## 🏗️ Arquitectura del Proyecto

```
proyecto-tareas/
├── backend/          # API REST con Node.js + Express + TypeScript
├── frontend/         # Aplicación web con React + Vite + TypeScript
├── mobile-app/       # Aplicación móvil con React Native + Expo
├── database/         # Configuración de MySQL con Docker
├── docker-compose.yml
└── .env
```

## 🚀 Tecnologías Principales

### Backend
- **Node.js 20** con **TypeScript**
- **Express 5** - Framework web
- **Prisma ORM 6** - ORM para base de datos
- **MySQL 8** - Base de datos relacional
- **JWT** - Autenticación
- **Bcrypt** - Hash de contraseñas
- **Jest** - Testing

### Frontend Web
- **React 19** con **TypeScript**
- **Vite 7** - Build tool
- **Zustand** - Gestión de estado
- **React Router 7** - Enrutamiento
- **Tailwind CSS 4** - Estilos
- **Axios** - Cliente HTTP
- **Vitest** - Testing
- **Lucide React** - Iconos

### Mobile App
- **React Native 0.81** con **Expo 54**
- **TypeScript**
- **Zustand** - Gestión de estado
- **React Navigation** - Navegación
- **Axios** - Cliente HTTP
- **Expo Secure Store** - Almacenamiento seguro

### Database
- **MySQL 8** con Docker
- **Triggers de auditoría** automáticos
- **Scripts de inicialización** SQL

## 📋 Prerrequisitos

- **Node.js** >= 20.0.0
- **pnpm** >= 10.22.0 (recomendado) o npm
- **Docker** y **Docker Compose**
- **Git**

## ⚡ Instalación Rápida

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd proyecto-tareas
```

### 2. Configurar variables de entorno

Copiar el archivo de ejemplo y configurar:

```bash
cp .env.example .env
```

Editar `.env` con tus configuraciones:

```env
# Database
MYSQL_ROOT_PASSWORD=root_password
MYSQL_DATABASE=task_manager
MYSQL_USER=task_user
MYSQL_PASSWORD=taskpassword123
MYSQL_PORT=3307

# Backend
JWT_SECRET=tu-secreto-jwt-super-seguro
BACKEND_PORT=3001
NODE_ENV=development

# Frontend
VITE_API_URL=http://localhost:3001/api
FRONTEND_PORT=8000

# Mobile
MOBILE_APP_PORT=8001
EXPO_PUBLIC_BACKEND_URL_LOCAL=http://localhost:3001/api
EXPO_PUBLIC_BACKEND_URL_PHONE=http://TU_IP_LOCAL:3001/api
```

### 3. Iniciar con Docker Compose (Recomendado)

```bash
# Construir e iniciar todos los servicios
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener servicios
docker-compose down
```

Los servicios estarán disponibles en:
- **Frontend Web**: http://localhost:8000
- **Mobile App Web**: http://localhost:8001
- **Backend API**: http://localhost:3001
- **MySQL**: localhost:3307

### 4. Desarrollo Local (Sin Docker)

#### Backend

```bash
cd backend
pnpm install
pnpm prisma:generate
pnpm prisma:migrate
pnpm seed           # Datos de prueba
pnpm dev            # Inicia en puerto 3001
```

#### Frontend

```bash
cd frontend
pnpm install
pnpm dev            # Inicia en puerto 5173
```

#### Mobile App

```bash
cd mobile-app
npm install
npm start           # Inicia Expo
```

## 🧪 Testing

### Backend

```bash
cd backend
pnpm test              # Ejecutar todos los tests
pnpm test:watch        # Modo watch
pnpm test:coverage     # Con cobertura
pnpm test:unit         # Solo tests unitarios
pnpm test:integration  # Solo tests de integración
```

### Frontend

```bash
cd frontend
pnpm test              # Modo watch
pnpm test:run          # Ejecutar una vez
pnpm test:coverage     # Con cobertura
pnpm test:ui           # Interfaz gráfica
```

## 📦 Build para Producción

### Backend

```bash
cd backend
pnpm build
pnpm start
```

### Frontend

```bash
cd frontend
pnpm build
pnpm preview
```

### Mobile App

```bash
cd mobile-app
npm run build
```

## 🐳 Docker

### Comandos útiles

```bash
# Construir imágenes
docker-compose build

# Iniciar servicios específicos
docker-compose up backend frontend

# Ver logs de un servicio
docker-compose logs -f backend

# Ejecutar comandos en contenedores
docker-compose exec backend pnpm seed

# Limpiar volúmenes
docker-compose down -v
```

## 📱 Funcionalidades

### ✅ Autenticación
- Registro de usuarios
- Inicio de sesión con JWT
- Protección de rutas
- Persistencia de sesión

### ✅ Gestión de Tareas
- Crear tareas
- Editar tareas
- Eliminar tareas
- Cambiar estado (Pendiente → En Progreso → Completada)
- Filtrar por estado
- Buscar tareas
- Estadísticas en tiempo real

### ✅ Auditoría
- Registro automático de cambios (triggers MySQL)
- Historial de operaciones (INSERT, UPDATE, DELETE)

## 🎨 Características del UI

- ✨ **Modo claro/oscuro** con persistencia
- 📱 **Diseño responsive** para móvil, tablet y desktop
- 🎯 **Animaciones** suaves y fluidas
- ♿ **Accesibilidad** mejorada
- 🎨 **Sistema de diseño** consistente

## 📊 API Endpoints

### Autenticación

```http
POST /api/register
POST /api/login
```

### Tareas (Requieren autenticación)

```http
GET    /api/tasks
GET    /api/tasks/:id
POST   /api/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id
```

### Health Check

```http
GET /health
```

Ver documentación completa en [backend/README.md](./backend/README.md)

## 📁 Estructura Detallada

### Backend

```
backend/
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── src/
│   ├── __tests__/         # Tests
│   ├── config/            # Configuraciones
│   ├── controllers/       # Controladores
│   ├── dtos/              # Data Transfer Objects
│   ├── middlewares/       # Middlewares
│   ├── repositories/      # Capa de datos
│   ├── routes/            # Definición de rutas
│   ├── services/          # Lógica de negocio
│   ├── utils/             # Utilidades
│   ├── validators/        # Validadores
│   └── index.ts
└── Dockerfile
```

### Frontend

```
frontend/
├── src/
│   ├── api/              # Configuración de Axios
│   ├── components/       # Componentes reutilizables
│   ├── hooks/            # Custom hooks (Zustand)
│   ├── pages/            # Páginas/Vistas
│   ├── router/           # Configuración de rutas
│   ├── services/         # Servicios API
│   ├── types/            # Tipos TypeScript
│   └── utils/            # Utilidades
├── tests/                # Tests con Vitest
└── Dockerfile
```

### Mobile App

```
mobile-app/
├── src/
│   ├── api/              # Configuración de Axios
│   ├── components/       # Componentes
│   ├── navigation/       # Navegación
│   ├── screens/          # Pantallas
│   ├── services/         # Servicios
│   ├── store/            # Zustand stores
│   ├── theme/            # Sistema de diseño
│   └── types/            # Tipos TypeScript
└── Dockerfile
```

## 🔐 Seguridad

- ✅ JWT para autenticación
- ✅ Contraseñas hasheadas con bcrypt (10 rounds)
- ✅ CORS configurado
- ✅ Validación de inputs en backend y frontend
- ✅ Almacenamiento seguro en móvil (SecureStore/localStorage)
- ✅ Variables de entorno para secretos