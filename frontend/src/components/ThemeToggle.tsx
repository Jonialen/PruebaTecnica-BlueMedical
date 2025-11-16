// ThemeToggle.tsx (src/components/ThemeToggle.tsx)

import { Moon, Sun } from 'lucide-react';
import { useTheme } from "@hooks/useTheme";

/**
 * Componente de botón para cambiar entre el tema claro y oscuro.
 * 
 * Utiliza el hook `useTheme` para obtener el estado actual del tema y la función para cambiarlo.
 * Muestra un ícono de sol o luna según el tema activo.
 *
 * @returns {JSX.Element} El botón de cambio de tema.
 */
export const ThemeToggle = () => {
    const { isDark, toggle } = useTheme();

    return (
        <button
            onClick={toggle}
            className="relative w-16 h-8 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 dark:focus:ring-offset-background-dark shadow-sm hover:shadow-md"
            style={{
                backgroundColor: isDark ? '#F28322' : '#F2A81D',
            }}
            aria-label="Toggle theme"
            title={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
        >
            {/* Iconos de fondo para el sol y la luna. */}
            <div className="absolute inset-0 flex items-center justify-between !px-2">
                <Sun className={`w-3.5 h-3.5 transition-opacity duration-300 ${isDark ? 'opacity-40' : 'opacity-0'} text-white`} />
                <Moon className={`w-3.5 h-3.5 transition-opacity duration-300 ${isDark ? 'opacity-0' : 'opacity-40'} text-white`} />
            </div>

            {/* Círculo del interruptor que se mueve. */}
            <div
                className={`absolute top-0.5 left-0.5 w-7 h-7 rounded-full bg-white shadow-md transform transition-all duration-300 flex items-center justify-center ${isDark ? 'translate-x-8' : 'translate-x-0'
                    }`}
            >
                {/* Icono dentro del círculo del interruptor. */}
                {isDark ? (
                    <Moon className="w-4 h-4 text-brand-500" />
                ) : (
                    <Sun className="w-4 h-4 text-brand-400" />
                )}
            </div>
        </button>
    );
};