// Login.tsx (src/pages/Login.tsx)

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "@hooks/useAuthStore";
import { Button } from "@components/ui/Button";
import { Input } from "@components/ui/Input";
import { CheckSquare, Mail, Lock, ArrowRight } from 'lucide-react';
import { validateLoginForm } from "@utils/validators";
import { ThemeToggle } from "@components/ThemeToggle";

/**
 * Página de inicio de sesión.
 * 
 * Permite a los usuarios iniciar sesión en la aplicación.
 * Maneja el estado del formulario, la validación y la comunicación con el store de autenticación.
 *
 * @returns {JSX.Element} La página de inicio de sesión.
 */
export default function Login() {
    const navigate = useNavigate();
    const { login, loading, error: authError } = useAuthStore();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validationError, setValidationError] = useState<string | null>(null);

    /**
     * Maneja el envío del formulario de inicio de sesión.
     * 
     * Valida los campos del formulario y, si son válidos, llama a la función de login.
     * Redirige al usuario a la página de tareas si el inicio de sesión es exitoso.
     *
     * @param {React.FormEvent} e - El evento del formulario.
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Valida el formulario antes de enviarlo.
        const error = validateLoginForm(email, password);
        if (error) {
            setValidationError(error);
            return;
        }

        setValidationError(null);
        // Llama a la función de login del store de autenticación.
        const ok = await login(email, password);
        if (ok) navigate("/tasks");
    };

    // Determina qué mensaje de error mostrar, dando prioridad al de validación.
    const displayError = validationError || authError;

    return (
        <div className="min-h-screen flex items-center justify-center !p-6 transition-colors duration-300" style={{ backgroundColor: 'var(--bg-primary)' }}>
            {/* Botón para cambiar el tema, posicionado en la esquina superior derecha. */}
            <div className="fixed top-8 right-8 z-10">
                <ThemeToggle />
            </div>

            <div className="w-full max-w-lg">
                {/* Encabezado de la página */}
                <div className="text-center !mb-4">
                    <div className="inline-flex !p-5 rounded-2xl !mb-6 shadow-lg" style={{
                        backgroundColor: 'var(--brand-500)'
                    }}>
                        <CheckSquare className="w-12 h-12 text-white" strokeWidth={2.5} />
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                        Bienvenido de nuevo
                    </h1>
                    <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
                        Ingresa para gestionar tus tareas
                    </p>
                </div>

                {/* Tarjeta del formulario */}
                <div className="rounded-2xl border-2 !px-10 !py-8.5 shadow-xl" style={{
                    backgroundColor: 'var(--bg-secondary)',
                    borderColor: 'var(--border-primary)'
                }}>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Input
                            label="Correo electrónico"
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setValidationError(null);
                            }}
                            icon={<Mail className="w-4 h-4" />}
                            placeholder="tu@email.com"
                            required
                        />

                        <Input
                            label="Contraseña"
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setValidationError(null);
                            }}
                            icon={<Lock className="w-4 h-4" />}
                            placeholder="••••••••"
                            required
                        />

                        {/* Muestra un mensaje de error si existe. */}
                        {displayError && (
                            <div className="!p-4 !mt-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl animate-slide-down">
                                <p className="text-sm text-red-600 dark:text-red-400">{displayError}</p>
                            </div>
                        )}

                        <div className="!pt-4">
                            <Button
                                type="submit"
                                loading={loading}
                                size="lg"
                                className="w-full"
                                icon={<ArrowRight className="w-5 h-5" />}
                            >
                                Iniciar sesión
                            </Button>
                        </div>
                    </form>
                </div>

                {/* Pie de página con enlace para registrarse. */}
                <div className="!mt-8 text-center">
                    <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
                        ¿No tienes una cuenta?
                    </p>
                    <Link to="/register">
                        <Button variant="ghost" size="lg" className="w-full">
                            Crear cuenta nueva
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
