# 🎨 Frontend - Gestor de Tareas

Aplicación web moderna construida con React 19, TypeScript, Vite y Tailwind CSS.

## 🚀 Tecnologías

- **React 19.2** - Biblioteca de UI
- **TypeScript 5.9** - Tipado estático
- **Vite 7.2** - Build tool y dev server
- **Tailwind CSS 4.1** - Framework de estilos
- **Zustand 5.0** - Gestión de estado
- **React Router 7.9** - Enrutamiento
- **Axios 1.13** - Cliente HTTP
- **Vitest 4.0** - Framework de testing
- **Lucide React** - Biblioteca de iconos
- **Sonner** - Notificaciones toast
- **date-fns** - Utilidades de fechas

## 📋 Prerrequisitos

- Node.js >= 20.0.0
- pnpm >= 10.22.0 (recomendado) o npm
- Backend corriendo en `http://localhost:3001`

## ⚡ Instalación y Configuración

### 1. Instalar dependencias

```bash
pnpm install
```

### 2. Configurar variables de entorno

Crear archivo `.env` en la raíz del frontend:

```env
VITE_API_URL=http://localhost:3001/api
VITE_APP_NAME=Gestor de Tareas
VITE_API_TIMEOUT=10000
```

### 3. Iniciar servidor de desarrollo

```bash
pnpm dev
```

La aplicación estará disponible en `http://localhost:5173`

## 📦 Scripts Disponibles

```bash
pnpm dev              # Inicia el servidor de desarrollo con hot reload
pnpm build            # Compila TypeScript y construye para producción
pnpm preview          # Previsualiza la build de producción
pnpm lint             # Ejecuta ESLint
pnpm test             # Ejecuta tests en modo watch
pnpm test:run         # Ejecuta tests una vez
pnpm test:coverage    # Ejecuta tests con reporte de cobertura
pnpm test:ui          # Abre interfaz gráfica de Vitest
```

## 🏗️ Estructura del Proyecto

```
frontend/
├── public/
│   └── vite.svg
├── src/
│   ├── api/
│   │   └── axios.ts              # Configuración de Axios con interceptors
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── TaskCard.tsx          # Tarjeta de tarea individual
│   │   ├── TaskEditorModal.tsx   # Modal para crear/editar tareas
│   │   ├── ThemeToggle.tsx       # Botón de cambio de tema
│   │   └── ui/
│   │       ├── Button.tsx        # Componente de botón reutilizable
│   │       └── Input.tsx         # Componente de input reutilizable
│   ├── hooks/
│   │   ├── useAuthStore.ts       # Store de autenticación (Zustand)
│   │   ├── useTaskStore.ts       # Store de tareas (Zustand)
│   │   └── useTheme.ts           # Hook para manejo del tema
│   ├── pages/
│   │   ├── Login.tsx             # Página de inicio de sesión
│   │   ├── Register.tsx          # Página de registro
│   │   └── Tasks.tsx             # Página principal de tareas
│   ├── router/
│   │   └── AppRouter.tsx         # Configuración de rutas
│   ├── services/
│   │   ├── auth.service.ts       # Servicio de autenticación
│   │   └── tasks.service.ts      # Servicio de tareas
│   ├── types/
│   │   ├── api.types.ts          # Tipos de respuestas de API
│   │   ├── auth.types.ts         # Tipos de autenticación
│   │   ├── common.types.ts       # Tipos comunes
│   │   └── task.types.ts         # Tipos de tareas
│   ├── utils/
│   │   ├── formatDate.ts         # Utilidades de formato de fechas
│   │   ├── helpers.ts            # Funciones auxiliares
│   │   └── validators.ts         # Validadores de formularios
│   ├── App.css                   # Estilos del componente App
│   ├── App.tsx                   # Componente principal
│   ├── index.css                 # Estilos globales y variables CSS
│   ├── main.tsx                  # Punto de entrada
│   └── vite-env.d.ts            # Tipos de Vite
├── tests/
│   ├── components/
│   │   └── TaskCard.test.tsx     # Tests del componente TaskCard
│   ├── utils/
│   │   ├── validators.test.ts    # Tests de validadores
│   │   └── helpers.test.ts       # Tests de helpers
│   └── test-utils.tsx            # Utilidades de testing (opcional)
│   └── setup.ts                  # Configuración de tests
├── .dockerignore
├── .env.example
├── .gitignore
├── Dockerfile
├── eslint.config.js
├── index.html
├── package.json
├── README.md
├── tailwind.config.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── vitest.config.ts
```

## 🎨 Características del UI

### Sistema de Diseño

El proyecto utiliza un sistema de diseño basado en variables CSS para soportar modo claro y oscuro:

```css
:root {
  /* Colores de marca */
  --brand-500: #F28322;
  --brand-600: #D96E1A;
  
  /* Modo claro */
  --bg-primary: #FAFAFA;
  --bg-secondary: #FFFFFF;
  --text-primary: #171717;
  
  /* Estados de tareas */
  --yellow-bg: #FEFCE8;
  --blue-bg: #EFF6FF;
  --green-bg: #F0FDF4;
}

.dark {
  /* Modo oscuro */
  --bg-primary: #0A0A0A;
  --bg-secondary: #171717;
  --text-primary: #FAFAFA;
}
```

### Componentes Principales

#### TaskCard
Tarjeta de tarea con:
- Estado visual (colores)
- Botón de cambio de estado
- Botón de eliminación
- Fecha de creación
- Animaciones hover

#### TaskEditorModal
Modal para crear/editar con:
- Campo de título
- Campo de descripción
- Validación de formulario
- Animaciones de entrada

#### ThemeToggle
Interruptor de tema con:
- Animación suave
- Iconos de sol/luna
- Persistencia en localStorage

### Animaciones

```css
/* Definidas en index.css */
@keyframes fadeIn { ... }
@keyframes slideUp { ... }
@keyframes slideDown { ... }
@keyframes scaleIn { ... }
```

## 🔐 Autenticación

### Flujo de autenticación

1. Usuario ingresa credenciales
2. Se envía POST a `/api/login` o `/api/register`
3. Backend devuelve token JWT
4. Token se guarda en `localStorage`
5. Se agrega a headers de todas las peticiones

```typescript
// Interceptor de Axios
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});
```

### Rutas Protegidas

```typescript
// AppRouter.tsx
<Route
    path="/tasks"
    element={token ? <Tasks /> : <Navigate to="/login" />}
/>
```

## 📊 Gestión de Estado

### Zustand Stores

#### AuthStore

```typescript
interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}
```

#### TaskStore

```typescript
interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  fetchTasks: (status?: string) => Promise<void>;
  addTask: (data: Partial<Task>) => Promise<void>;
  updateTask: (id: number, data: Partial<Task>) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
}
```

## 🧪 Testing

### Configuración

El proyecto usa **Vitest** con **React Testing Library**.

```typescript
// vitest.config.ts
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.ts',
  }
})
```

### Ejecutar Tests

```bash
# Modo watch (desarrollo)
pnpm test

# Una sola ejecución
pnpm test:run

# Con reporte de cobertura
pnpm test:coverage

# Interfaz gráfica
pnpm test:ui
```

### Ejemplo de Test

```typescript
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { TaskCard } from '@components/TaskCard'

describe('TaskCard', () => {
  it('renders task information correctly', () => {
    render(<TaskCard task={mockTask} onDelete={vi.fn()} onUpdate={vi.fn()} />)
    expect(screen.getByText('Test Task')).toBeInTheDocument()
  })
})
```

### Cobertura de Tests

Los tests cubren:
- ✅ Componentes de UI
- ✅ Validadores de formularios
- ✅ Funciones auxiliares
- ✅ Formateo de datos

## 🐳 Docker

### Build de imagen

```bash
docker build -t task-manager-frontend .
```

### Ejecutar contenedor

```bash
docker run -p 8000:80 \
  -e VITE_API_URL=http://localhost:3001/api \
  task-manager-frontend
```

### Multi-stage build

El `Dockerfile` utiliza multi-stage build:
1. **Stage 1 (builder)**: Instala dependencias y construye la app
2. **Stage 2 (nginx)**: Sirve la app estática con Nginx

## 🎯 Alias de TypeScript

Configurados en `tsconfig.app.json` y `vite.config.ts`:

```typescript
'@/*': ['src/*']
'@components/*': ['src/components/*']
'@pages/*': ['src/pages/*']
'@services/*': ['src/services/*']
'@hooks/*': ['src/hooks/*']
'@models/*': ['src/types/*']
'@utils/*': ['src/utils/*']
'@api/*': ['src/api/*']
```

Uso:

```typescript
import { TaskCard } from '@components/TaskCard'
import { useAuthStore } from '@hooks/useAuthStore'
import { Task } from '@models/task.types'
```

## 🌐 Variables de Entorno

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `VITE_API_URL` | URL del backend API | `http://localhost:3001/api` |
| `VITE_APP_NAME` | Nombre de la aplicación | `Gestor de Tareas` |
| `VITE_API_TIMEOUT` | Timeout de peticiones (ms) | `10000` |

**Nota**: Las variables deben tener el prefijo `VITE_` para estar disponibles en el cliente.

## 🚀 Build para Producción

### 1. Compilar

```bash
pnpm build
```

Genera:
- Archivos en `/dist`
- Assets optimizados
- Bundle minificado

### 2. Previsualizar

```bash
pnpm preview
```

Sirve la build en `http://localhost:5173`

### 3. Análisis de Bundle

```bash
# Instalar plugin
pnpm add -D rollup-plugin-visualizer

# Agregar a vite.config.ts y ejecutar build
```

## 📱 Responsive Design

La aplicación es completamente responsive:

- **Móvil**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

Utiliza Tailwind breakpoints:

```html
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
  <!-- ... -->
</div>
```

## ♿ Accesibilidad

- ✅ Etiquetas semánticas HTML5
- ✅ ARIA labels en botones e iconos
- ✅ Contraste de colores (WCAG AA)
- ✅ Navegación por teclado
- ✅ Focus visible en elementos interactivos

## 🐛 Debugging

### React DevTools

Instalar extensión de navegador para inspeccionar componentes y estado.

### Zustand DevTools

```typescript
import { devtools } from 'zustand/middleware'

export const useAuthStore = create(
  devtools(
    (set) => ({ /* ... */ }),
    { name: 'AuthStore' }
  )
)
```

### Logs de Axios

Los interceptors de Axios loguean:
- Requests enviados
- Responses recibidas
- Errores de red

## 🔧 Troubleshooting

### Puerto ocupado

```bash
# Cambiar puerto en vite.config.ts
server: {
  port: 3000
}
```

### Errores de TypeScript

```bash
# Limpiar cache de TypeScript
rm -rf node_modules/.vite
pnpm build
```

### Errores de CORS

Verificar que el backend tenga configurado el origen del frontend en CORS.

## 📚 Recursos

- [React Docs](https://react.dev/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [Vitest](https://vitest.dev/)
