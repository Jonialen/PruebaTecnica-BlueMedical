import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "@hooks/useAuthStore";
import { Button } from "@components/ui/Button";
import { Input } from "@components/ui/Input";
import { Loader2, CheckSquare } from "lucide-react";

export default function Login() {
    const navigate = useNavigate();
    const { login, loading, error } = useAuthStore();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const ok = await login(email, password);
        if (ok) navigate("/tasks");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
            <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-md overflow-hidden">
                {/* Lado Izquierdo: Branding */}
                <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-blue-600 text-white p-10">
                    <CheckSquare className="w-12 h-12 mb-4" />
                    <h1 className="text-3xl font-semibold">Gestor de tareas</h1>
                    <p className="text-sm opacity-80 mt-2 text-center">
                        Organiza tu día y mantén el control de tus pendientes.
                    </p>
                </div>

                {/* Lado Derecho: Formulario */}
                <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
                    <h2 className="text-2xl font-semibold text-gray-800 text-center mb-2">
                        Iniciar sesión
                    </h2>
                    <p className="text-sm text-gray-500 text-center mb-6">
                        Ingresa tus credenciales para continuar
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4 w-full max-w-sm mx-auto"
                    >
                        <Input
                            label="Correo electrónico"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <Input
                            label="Contraseña"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        {error && (
                            <p className="text-center text-sm text-red-500">{error}</p>
                        )}

                        <Button type="submit" disabled={loading}>
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Entrando...
                                </span>
                            ) : (
                                "Entrar"
                            )}
                        </Button>

                        <p className="text-sm text-center text-gray-600">
                            ¿No tienes cuenta?{" "}
                            <Link to="/register" className="text-blue-600 hover:underline">
                                Regístrate
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}