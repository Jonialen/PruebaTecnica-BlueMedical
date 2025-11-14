// src/pages/Login.tsx
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '@store/authStore';
import Input from '@components/common/Input';
import Button from '@components/common/Button';
import { Alert } from '@components/common/Spinner';
import { LogIn } from 'lucide-react';

const loginSchema = z.object({
    email: z.email('Email inválido'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
    const navigate = useNavigate();
    const { login, isAuthenticated, error, clearError } = useAuthStore();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/tasks', { replace: true });
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        clearError();
    }, []);

    const onSubmit = async (data: LoginFormData) => {
        try {
            await login(data);
        } catch (err) {
            // Error manejado en el store
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center px-4">
            <div className="max-w-md w-full">
                {/* Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                            <LogIn className="h-8 w-8 text-primary-600" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Iniciar Sesión
                        </h1>
                        <p className="text-gray-600">
                            Bienvenido al Gestor de Tareas
                        </p>
                    </div>

                    {/* Error Alert */}
                    {error && (
                        <div className="mb-6">
                            <Alert type="error" message={error} onClose={clearError} />
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <Input
                            type="email"
                            label="Email"
                            placeholder="tu@email.com"
                            error={errors.email?.message}
                            {...register('email')}
                            required
                            autoFocus
                        />

                        <Input
                            type="password"
                            label="Contraseña"
                            placeholder="••••••••"
                            error={errors.password?.message}
                            {...register('password')}
                            required
                        />

                        <Button
                            type="submit"
                            fullWidth
                            isLoading={isSubmitting}
                        >
                            Iniciar Sesión
                        </Button>
                    </form>

                    {/* Footer */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            ¿No tienes una cuenta?{' '}
                            <Link
                                to="/register"
                                className="font-medium text-primary-600 hover:text-primary-700"
                            >
                                Regístrate aquí
                            </Link>
                        </p>
                    </div>

                    {/* Demo credentials */}
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                        <p className="text-xs text-blue-800 font-medium mb-1">
                            Credenciales de prueba:
                        </p>
                        <p className="text-xs text-blue-700">
                            Email: demo@roble.com<br />
                            Contraseña: 123456
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;