# 📱 Mobile App - Gestor de Tareas

Aplicación móvil nativa construida con React Native, Expo y TypeScript.

---

## 🚀 Tecnologías

* **React Native 0.81** - Framework móvil
* **Expo 54** - Plataforma de desarrollo
* **TypeScript 5.9** - Tipado estático
* **Zustand 5.0** - Gestión de estado
* **React Navigation 7** - Navegación
* **Axios 1.13** - Cliente HTTP
* **Expo Secure Store** - Almacenamiento seguro
* **Lucide React Native** - Iconos
* **date-fns 4.1** - Utilidades de fechas

---

## 📋 Prerrequisitos

* Node.js >= 18.0.0
* npm (incluido con Node.js)
* Backend corriendo en `http://localhost:3001`
* Para desarrollo en dispositivo físico: Expo Go app instalada

### Opcional (desarrollo avanzado)

* Android Studio
* Xcode (solo en macOS)

---

## ⚡ Instalación y Configuración

### 1. Instalar dependencias

```bash
cd mobile-app
npm install
```

### 2. Configurar variables de entorno

Crear archivo `.env`:

```env
# Para desarrollo en el mismo equipo (web/emulador)
EXPO_PUBLIC_BACKEND_URL_LOCAL=http://localhost:3001/api

# Para desarrollo en dispositivo físico
EXPO_PUBLIC_BACKEND_URL_PHONE=http://192.168.1.100:3001/api
```

> Reemplaza `192.168.1.100` con tu IP local.

### 3. Iniciar el servidor de desarrollo

```bash
npm start
```

---

## 📱 Ejecución en Diferentes Plataformas

### Web

```bash
npm run web
```

### iOS (macOS)

```bash
npm run ios
```

### Android

```bash
npm run android
```

### Dispositivo Físico

1. Instala **Expo Go**
2. Ejecuta `npm start`
3. Escanea el código QR
4. Asegúrate de estar en la misma red WiFi

---

## 🏗️ Estructura del Proyecto

```
mobile-app/
├── assets/
├── src/
│   ├── api/
│   ├── components/
│   ├── navigation/
│   ├── screens/
│   ├── services/
│   ├── store/
│   ├── theme/
│   └── types/
├── App.tsx
├── app.json
└── Dockerfile
```

---

## 🎨 Sistema de Diseño

### Colores

```ts
colors.brand[500]
colors.neutral[800]
colors.success[500]
colors.error[500]
```

### Espaciado

```ts
spacing.xs
spacing.md
spacing.xxxl
```

### Tipografía

```ts
typography.sizes.base
typography.weights.semibold
```

---

## 🔐 Autenticación

### Flujo

1. Usuario ingresa credenciales
2. Backend devuelve JWT
3. Token se guarda en **Secure Store** (móvil) o **localStorage** (web)
4. Se agrega a headers de Axios

### Almacenamiento Seguro

```ts
storage.getItem
storage.setItem
storage.removeItem
```

---

## 📊 Gestión de Estado

### AuthStore (Zustand)

* `login`
* `register`
* `logout`
* `initialize`

### TaskStore

* `fetchTasks`
* `addTask`
* `updateTask`
* `deleteTask`

---

## 🧭 Navegación

```ts
type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Tasks: undefined;
};
```

Rutas protegidas basadas en el token.

---

## 🎯 Alias de TypeScript

```ts
'@components/*'
'@services/*'
'@store/*'
'@theme'
```

---

## 📱 Funcionalidades

### Autenticación

* Registro
* Login
* Persistencia
* Secure Store

### Tareas

* CRUD completo
* Cambiar estado
* Filtros
* Búsqueda
* Estadísticas

### UI/UX

* Animaciones
* FAB
* Modal Bottom Sheet
* Diseño adaptable

---

## 🐳 Docker

### Build

```bash
docker build -t task-manager-mobile .
```

### Ejecutar (modo web)

```bash
docker run -p 8001:80 \
  -e EXPO_PUBLIC_BACKEND_URL_LOCAL=http://localhost:3001/api \
  task-manager-mobile
```

---

## 📦 Build para Producción

### Web

```bash
npx expo export --platform web
```

### Nativo (EAS Build)

```bash
eas build --platform android
eas build --platform ios
```

---

## 🌐 Variables de Entorno

| Variable                      | Descripción            | Ejemplo                                                        |
| ----------------------------- | ---------------------- | -------------------------------------------------------------- |
| EXPO_PUBLIC_BACKEND_URL_LOCAL | Backend local          | [http://localhost:3001/api](http://localhost:3001/api)         |
| EXPO_PUBLIC_BACKEND_URL_PHONE | Backend en dispositivo | [http://192.168.1.100:3001/api](http://192.168.1.100:3001/api) |

> Todas deben iniciar con `EXPO_PUBLIC_`.

---

## 🐛 Debugging

* React Native Debugger
* Expo Dev Tools
* Chrome DevTools (web)

---

## 🔧 Troubleshooting

### "Network request failed"

* Backend no accesible
* IP incorrecta en `.env`
* Dispositivo en otra red
* Firewall

### "Unable to resolve module"

```bash
rm -rf node_modules
npm install
npx expo start --clear
```

### App no se actualiza

* `R` en Expo
* `npx expo start --clear`

---

## 📚 Recursos

* Expo Docs
* React Native Docs
* Zustand Docs
* React Navigation Docs

---

## 🎨 Diferencias Web vs Mobile

| Aspecto    | Web          | Mobile              |
| ---------- | ------------ | ------------------- |
| Navegación | React Router | React Navigation    |
| Storage    | localStorage | Secure Store        |
| UI         | HTML/CSS     | RN Views            |
| Estilos    | Tailwind     | StyleSheet          |
| Iconos     | lucide-react | lucide-react-native |
| Gestos     | Click        | Touch/Swipe         |

---

## 📊 Rendimiento

* Lazy loading
* Memoización
* FlatList
* Estado eficiente

---

## 🔒 Seguridad

* JWT
* Secure Store
* HTTPS
* Validación
* Timeout de sesión

---

## 🚀 Próximas Mejoras

* [ ] Notificaciones push
* [ ] Modo offline
* [ ] Modo oscuro
* [ ] Gestos de deslizamiento

**Estimado:** En 2 días se integrarán estas mejoras para darle un plus a la aplicación.

---

# 📲 Recomendación para Probar la App en Teléfono

### ✔️ **Opción recomendada: Ejecutar todo con Docker Compose**

Para una experiencia más confiable:

```bash
docker compose up -d
```

Luego:

```bash
npx expo start
```

Esto levanta backend + base de datos + servicios necesarios.

---

### ✔️ **Opción alternativa: Solo backend + base de datos**

Si no deseas levantar todo:

1. Inicia únicamente backend + base de datos
2. Luego:

```bash
npx expo start
```

Solo asegúrate de configurar correctamente `EXPO_PUBLIC_BACKEND_URL_PHONE`.
