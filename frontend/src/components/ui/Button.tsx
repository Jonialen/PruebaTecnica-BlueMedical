// Button.tsx (src/components/ui/Button.tsx)

import { clsx } from "clsx";
import { Loader2 } from 'lucide-react';

/**
 * Props para el componente Button.
 */
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** La variante de estilo del botón. */
    variant?: "primary" | "secondary" | "ghost" | "danger";
    /** El tamaño del botón. */
    size?: "sm" | "md" | "lg";
    /** Si el botón está en estado de carga. */
    loading?: boolean;
    /** Un ícono para mostrar a la izquierda del texto. */
    icon?: React.ReactNode;
}

/**
 * Componente de botón reutilizable con variantes de estilo y tamaños.
 * 
 * Proporciona un botón estilizado con soporte para diferentes apariencias,
 * tamaños, estado de carga y un ícono opcional.
 *
 * @param {Props} props - Las propiedades del componente.
 * @returns {JSX.Element} El componente de botón.
 */
export const Button = ({
    variant = "primary",
    size = "md",
    loading = false,
    icon,
    className,
    children,
    disabled,
    ...props
}: Props) => {
    // Estilos base aplicados a todos los botones.
    const baseStyles = "inline-flex items-center justify-center gap-2.5 font-semibold transition-all duration-200 focus:outline-none focus:ring-4 disabled:cursor-not-allowed";

    // Definición de las variantes de estilo.
    const variants = {
        primary: clsx(
            "text-white border-2",
            "shadow-md hover:shadow-xl active:shadow-sm",
            "transform hover:-translate-y-0.5 active:translate-y-0"
        ),
        secondary: clsx(
            "border-2 shadow-sm hover:shadow-md active:shadow-sm",
            "transform hover:-translate-y-0.5 active:translate-y-0"
        ),
        ghost: clsx(
            "hover:shadow-sm"
        ),
        danger: clsx(
            "bg-red-500 text-white border-2 border-red-500",
            "hover:bg-red-600 hover:border-red-600",
            "active:bg-red-700 active:border-red-700",
            "shadow-md hover:shadow-xl active:shadow-sm",
            "transform hover:-translate-y-0.5 active:translate-y-0",
            "focus:ring-red-500/30",
            "disabled:bg-gray-300 dark:disabled:bg-gray-600"
        ),
    };

    // Definición de los tamaños.
    const sizes = {
        sm: "text-xs !px-4 !py-2.5 rounded-lg",
        md: "text-sm !px-3 !py-3 !my-2.5 rounded-xl",
        lg: "text-base !px-3 !py-2 !mt-3 rounded-xl",
    };

    return (
        <button
            {...props}
            disabled={disabled || loading}
            className={clsx(
                baseStyles,
                variants[variant],
                sizes[size],
                (disabled || loading) && "opacity-60",
                className
            )}
            // Estilos en línea para manejar las variables de color del tema.
            style={
                variant === "primary"
                    ? {
                        backgroundColor: 'var(--brand-500)',
                        borderColor: 'var(--brand-600)',
                    }
                    : variant === "secondary"
                        ? {
                            backgroundColor: 'var(--bg-secondary)',
                            borderColor: 'var(--border-primary)',
                            color: 'var(--text-primary)',
                        }
                        : variant === "ghost"
                            ? {
                                color: 'var(--text-primary)',
                            }
                            : undefined
            }
            // Manejadores de eventos para los efectos hover.
            onMouseEnter={
                variant === "primary"
                    ? (e) => {
                        e.currentTarget.style.backgroundColor = 'var(--brand-600)';
                    }
                    : variant === "secondary"
                        ? (e) => {
                            e.currentTarget.style.borderColor = 'var(--brand-500)';
                            e.currentTarget.style.backgroundColor = 'var(--brand-50)';
                        }
                        : variant === "ghost"
                            ? (e) => {
                                e.currentTarget.style.backgroundColor = 'var(--brand-50)';
                                e.currentTarget.style.color = 'var(--brand-600)';
                            }
                            : undefined
            }
            onMouseLeave={
                variant === "primary"
                    ? (e) => {
                        e.currentTarget.style.backgroundColor = 'var(--brand-500)';
                    }
                    : variant === "secondary"
                        ? (e) => {
                            e.currentTarget.style.borderColor = 'var(--border-primary)';
                            e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                        }
                        : variant === "ghost"
                            ? (e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.color = 'var(--text-primary)';
                            }
                            : undefined
            }
        >
            {/* Muestra un spinner si el botón está en estado de carga. */}
            {loading ? (
                <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {children}
                </>
            ) : (
                <>
                    {icon}
                    {children}
                </>
            )}
        </button>
    );
};