// src/components/ui/Input.tsx
import { clsx } from "clsx";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    icon?: React.ReactNode;
}

export const Input = ({ label, error, icon, className, ...props }: Props) => (
    <div className="flex flex-col gap-2.5">
        <label className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
            {label}
        </label>
        <div className="relative">
            {icon && (
                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none transition-colors" style={{ color: 'var(--text-tertiary)' }}>
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
                    icon ? "pl-14 pr-4" : "px-4",
                    "placeholder:text-[var(--text-tertiary)]",
                    className
                )}
                style={{
                    backgroundColor: 'var(--bg-secondary)',
                    borderColor: error ? '#EF4444' : 'var(--border-primary)',
                    color: 'var(--text-primary)'
                }}
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
        {error && (
            <p className="text-xs text-red-500 dark:text-red-400 animate-slide-down flex items-center gap-1.5 mt-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500"></span>
                {error}
            </p>
        )}
    </div>
);
