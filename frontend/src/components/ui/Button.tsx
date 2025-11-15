// src/components/ui/Button.tsx
import { clsx } from "clsx";
import { Loader2 } from 'lucide-react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost" | "danger";
    size?: "sm" | "md" | "lg";
    loading?: boolean;
    icon?: React.ReactNode;
}

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
    const baseStyles = "inline-flex items-center justify-center gap-2.5 font-semibold transition-all duration-200 focus:outline-none focus:ring-4 disabled:cursor-not-allowed";

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
