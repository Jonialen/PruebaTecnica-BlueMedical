// src/components/tasks/TaskForm.tsx
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Input from '@components/common/Input';
import Button from '@components/common/Button';
import type { Task } from '@models/task.types';

const taskSchema = z.object({
    title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
    description: z.string().optional(),
    status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED']),
});

type TaskFormData = z.infer<typeof taskSchema>;

interface TaskFormProps {
    task?: Task | null;
    onSubmit: (data: TaskFormData) => Promise<void>;
    onCancel: () => void;
}

const TaskForm = ({ task, onSubmit, onCancel }: TaskFormProps) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<TaskFormData>({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            title: task?.title || '',
            description: task?.description || '',
            status: task?.status || 'PENDING',
        },
    });

    useEffect(() => {
        if (task) {
            reset({
                title: task.title,
                description: task.description || '',
                status: task.status,
            });
        }
    }, [task, reset]);

    const handleFormSubmit = async (data: TaskFormData) => {
        try {
            await onSubmit(data);
            if (!task) {
                reset();
            }
        } catch (error) {
            // Error manejado por el componente padre
        }
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
            <Input
                type="text"
                label="Título"
                placeholder="Ej: Completar documentación"
                error={errors.title?.message}
                {...register('title')}
                required
                autoFocus
            />

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Descripción
                </label>
                <textarea
                    placeholder="Describe la tarea..."
                    rows={4}
                    className={`
            w-full px-4 py-2.5 
            border rounded-lg 
            text-gray-900 placeholder-gray-400
            transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
            disabled:bg-gray-100 disabled:cursor-not-allowed
            ${errors.description
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-gray-300 hover:border-gray-400'
                        }
          `}
                    {...register('description')}
                />
                {errors.description && (
                    <p className="mt-1.5 text-sm text-red-600">{errors.description.message}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Estado <span className="text-red-500">*</span>
                </label>
                <select
                    className={`
            w-full px-4 py-2.5 
            border rounded-lg 
            text-gray-900
            transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
            disabled:bg-gray-100 disabled:cursor-not-allowed
            ${errors.status
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-gray-300 hover:border-gray-400'
                        }
          `}
                    {...register('status')}
                >
                    <option value="PENDING">Pendiente</option>
                    <option value="IN_PROGRESS">En Progreso</option>
                    <option value="COMPLETED">Completada</option>
                </select>
                {errors.status && (
                    <p className="mt-1.5 text-sm text-red-600">{errors.status.message}</p>
                )}
            </div>

            <div className="flex gap-3 pt-4">
                <Button
                    type="button"
                    variant="secondary"
                    fullWidth
                    onClick={onCancel}
                    disabled={isSubmitting}
                >
                    Cancelar
                </Button>
                <Button
                    type="submit"
                    fullWidth
                    isLoading={isSubmitting}
                >
                    {task ? 'Actualizar' : 'Crear'} Tarea
                </Button>
            </div>
        </form>
    );
};

export default TaskForm;