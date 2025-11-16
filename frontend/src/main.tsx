// main.tsx (src/main.tsx)

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

/**
 * Punto de entrada de la aplicación React.
 * 
 * Este archivo se encarga de renderizar el componente principal `App` en el DOM.
 * Utiliza `createRoot` para habilitar el modo concurrente de React.
 */
const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    // StrictMode es una herramienta para destacar problemas potenciales en la aplicación.
    // Activa comprobaciones y advertencias adicionales para sus descendientes.
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  console.error("No se pudo encontrar el elemento con id 'root'. La aplicación no puede iniciarse.");
}
