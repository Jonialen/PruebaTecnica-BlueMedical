import { useState } from "react";
import { useAuthStore } from "@hooks/useAuthStore";
import { useNavigate, Link } from "react-router-dom";
import { validateRegisterForm } from "@utils/validators";
import { Button } from "@components/ui/Button";
import { Input } from "@components/ui/Input";
import { Loader2, CheckSquare } from "lucide-react";

export default function Register() {
    const { register, loading, error: authError } = useAuthStore();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validationError, setValidationError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const error = validateRegisterForm(name, email, password);
        if (error) {
            setValidationError(error);
            return;
        }

        setValidationError(null);
        const ok = await register(name, email, password);
        if (ok) navigate("/tasks");
    };

    const displayError = validationError || authError;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
            <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-md overflow-hidden">
                <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-blue-600 text-white p-10">
                    <CheckSquare className="w-12 h-12 mb-4" />
                    <h1 className="text-3xl font-semibold">Gestor de tareas</h1>
                    <p className="text-sm opacity-80 mt-2 text-center">
                        Regístrate para empezar a organizar tus pendientes.
                    </p>
                </div>

                <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
                    <h2 className="text-2xl font-semibold text-gray-800 text-center mb-2">
                        Crear cuenta
                    </h2>
                    <p className="text-sm text-gray-500 text-center mb-6">
                        Llena los campos para registrarte
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4 w-full max-w-sm mx-auto"
                    >
                        <Input
                            label="Nombre completo"
                            type="text"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                setValidationError(null);
                            }}
                            required
                        />

                        <Input
                            label="Correo electrónico"
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setValidationError(null);
                            }}
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
                            required
                        />

                        {displayError && (
                            <p className="text-center text-sm text-red-500">{displayError}</p>
                        )}

                        <Button type="submit" disabled={loading}>
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Registrando...
                                </span>
                            ) : (
                                "Registrarme"
                            )}
                        </Button>

                        <p className="text-sm text-center text-gray-600">
                            ¿Ya tienes cuenta?{" "}
                            <Link to="/login" className="text-blue-600 hover:underline">
                                Inicia sesión
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}