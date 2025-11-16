// Input.tsx (src/components/ui/Input.tsx)

import { clsx } from "clsx";

/**
 * Props para el componente Input.
 */
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    /** La etiqueta del campo de entrada. */
    label: string;
    /** Un mensaje de error para mostrar debajo del campo. */
    error?: string;
    /** Un ícono para mostrar dentro del campo de entrada. */
    icon?: React.ReactNode;
}

/**
 * Componente de campo de entrada reutilizable.
 * 
 * Proporciona un campo de entrada estilizado con una etiqueta, un ícono opcional
 * y manejo de errores.
 *
 * @param {Props} props - Las propiedades del componente.
 * @returns {JSX.Element} El componente de campo de entrada.
 */
export const Input = ({ label, error, icon, className, ...props }: Props) => (
    <div className="flex flex-col gap-2.5">
        <label className="text-sm font-semibold text-left !pl-2 !pt-2" style={{ color: 'var(--text-primary)' }}>
            {label}
        </label>
        <div className="relative">
            {/* Muestra el ícono si se proporciona. */}
            {icon && (
                <div
                    className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none transition-colors z-10"
                    style={{ color: 'var(--text-tertiary)' }}
                >
                    {icon}
                </div>
            )}
            <input
                {...props}
                className={clsx(
                    "w-full h-12 rounded-xl transition-all duration-200",
                    "border-2",
                    "focus:outline-none focus:ring-4",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    "placeholder:text-[var(--text-tertiary)]",
                    icon ? "!pl-9 !pr-4" : "!px-4", // Añade padding si hay un ícono.
                    className
                )}
                // Estilos en línea para manejar los colores del tema y el estado de error.
                style={{
                    backgroundColor: 'var(--bg-secondary)',
                    borderColor: error ? '#EF4444' : 'var(--border-primary)',
                    color: 'var(--text-primary)'
                }}
                // Manejadores de eventos para los efectos de foco y desenfoque.
                onFocus={(e) => {
                    if (!error) {
                        e.target.style.borderColor = 'var(--brand-500)';
                        e.target.style.boxShadow = '0 0 0 4px rgba(242, 131, 34, 0.1)';
                    }
                }}
                onBlur={(e) => {
                    e.target.style.borderColor = error ? '#EF4444' : 'var(--border-primary)';
                    e.target.style.boxShadow = 'none';
                }}
            />
        </div>
        {/* Muestra el mensaje de error si se proporciona. */}
        {error && (
            <p className="text-xs text-red-500 dark:text-red-400 animate-slide-down flex items-center gap-1.5 mt-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500"></span>
                {error}
            </p>
        )}
    </div>
);
