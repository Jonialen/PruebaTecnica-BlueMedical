// src/pages/Register.tsx
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '@store/authStore';
import Input from '@components/common/Input';
import Button from '@components/common/Button';
import { Alert } from '@components/common/Spinner';
import { UserPlus } from 'lucide-react';

const registerSchema = z.object({
    name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
});

type RegisterFormData = z.infer<typeof registerSchema>;

const Register = () => {
    const navigate = useNavigate();
    const { register: registerUser, isAuthenticated, error, clearError } = useAuthStore();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/tasks', { replace: true });
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        clearError();
    }, [clearError]);

    const onSubmit = async (data: RegisterFormData) => {
        try {
            await registerUser({
                name: data.name,
                email: data.email,
                password: data.password,
            });
        } catch (err) {
            // Error manejado en el store
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center px-4">
            <div className="max-w-md w-full">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                            <UserPlus className="h-8 w-8 text-primary-600" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Crear Cuenta
                        </h1>
                        <p className="text-gray-600">
                            Únete al Gestor de Tareas
                        </p>
                    </div>

                    {/* Error Alert */}
                    {error && (
                        <div className="mb-6">
                            <Alert type="error" message={error} onClose={clearError} />
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <Input
                            type="text"
                            label="Nombre completo"
                            placeholder="Juan Pérez"
                            error={errors.name?.message}
                            {...register('name')}
                            required
                            autoFocus
                        />

                        <Input
                            type="email"
                            label="Email"
                            placeholder="tu@email.com"
                            error={errors.email?.message}
                            {...register('email')}
                            required
                        />

                        <Input
                            type="password"
                            label="Contraseña"
                            placeholder="••••••••"
                            error={errors.password?.message}
                            {...register('password')}
                            required
                        />

                        <Input
                            type="password"
                            label="Confirmar contraseña"
                            placeholder="••••••••"
                            error={errors.confirmPassword?.message}
                            {...register('confirmPassword')}
                            required
                        />

                        <Button
                            type="submit"
                            fullWidth
                            isLoading={isSubmitting}
                        >
                            Crear cuenta
                        </Button>
                    </form>

                    {/* Footer */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            ¿Ya tienes una cuenta?{' '}
                            <Link
                                to="/login"
                                className="font-medium text-primary-600 hover:text-primary-700"
                            >
                                Inicia sesión aquí
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;