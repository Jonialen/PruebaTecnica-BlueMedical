// App.tsx (src/App.tsx)

import { AppRouter } from "./router/AppRouter";
import './App.css'
import { Toaster } from "sonner";

/**
 * Componente principal de la aplicación.
 * 
 * Este componente es el punto de entrada de la interfaz de usuario.
 * Renderiza el enrutador principal y el componente de notificaciones (Toaster).
 *
 * @returns {JSX.Element} El componente principal de la aplicación.
 */
export default function App() {
  return (
    // Contenedor principal con clases de estilo para la fuente y el color del texto.
    <div className="font-sans text-gray-900">
      {/* Renderiza el enrutador de la aplicación para manejar las diferentes rutas. */}
      <AppRouter />
      {/* Renderiza el componente Toaster para mostrar notificaciones en la esquina superior derecha. */}
      <Toaster position="top-right" richColors />
    </div>
  );
}
