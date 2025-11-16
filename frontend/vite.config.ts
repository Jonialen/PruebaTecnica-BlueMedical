// vite.config.ts (vite.config.ts)

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

/**
 * Configuración de Vite.
 * 
 * Define cómo Vite debe construir y servir la aplicación.
 * Incluye plugins, alias de rutas y configuración del servidor de desarrollo.
 *
 * @see https://vitejs.dev/config/
 */
export default defineConfig({
  // Plugins de Vite a utilizar.
  plugins: [
    react(), // Habilita el soporte para React.
    tailwindcss() // Habilita el soporte para Tailwind CSS.
  ],
  // Configuración de resolución de módulos.
  resolve: {
    // Alias para rutas de importación, facilitando la organización del código.
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@services': path.resolve(__dirname, './src/services'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@store': path.resolve(__dirname, './src/store'), // Aunque no se usa directamente en el código proporcionado, es un alias común.
      '@models': path.resolve(__dirname, './src/types'), // Alias para los tipos/modelos.
      '@utils': path.resolve(__dirname, './src/utils'),
      '@api': path.resolve(__dirname, './src/api'),
    },
  },
  // Configuración del servidor de desarrollo.
  server: {
    port: 5173, // Puerto en el que se ejecutará el servidor.
    host: true, // Permite el acceso desde la red local.
    strictPort: false, // No falla si el puerto ya está en uso.
  },
  // Configuración del servidor de previsualización.
  preview: {
    port: 5173, // Puerto en el que se ejecutará el servidor de previsualización.
    host: true, // Permite el acceso desde la red local.
  },
})