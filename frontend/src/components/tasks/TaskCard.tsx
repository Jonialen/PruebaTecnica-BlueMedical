// src/components/tasks/TaskCard.tsx
import { Edit2, Trash2, Calendar } from 'lucide-react';
import type { Task } from '@models/task.types';
import { format } from 'date-fns';

interface TaskCardProps {
    task: Task;
    onEdit: (task: Task) => void;
    onDelete: (id: number) => void;
}

const statusConfig = {
    PENDING: {
        label: 'Pendiente',
        className: 'badge-pending',
    },
    IN_PROGRESS: {
        label: 'En Progreso',
        className: 'badge-in-progress',
    },
    COMPLETED: {
        label: 'Completada',
        className: 'badge-completed',
    },
};

const TaskCard = ({ task, onEdit, onDelete }: TaskCardProps) => {
    const statusInfo = statusConfig[task.status];

    const formatDate = (dateString: string) => {
        try {
            return format(new Date(dateString), 'dd/MM/yyyy HH:mm');
        } catch {
            return dateString;
        }
    };

    return (
        <div className="card hover:shadow-md transition-shadow">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {task.title}
                    </h3>
                    <span className={`badge ${statusInfo.className}`}>
                        {statusInfo.label}
                    </span>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2 ml-4">
                    <button
                        onClick={() => onEdit(task)}
                        className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                        title="Editar"
                    >
                        <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => onDelete(task.id)}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Eliminar"
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>
            </div>

            {/* Description */}
            {task.description && (
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {task.description}
                </p>
            )}

            {/* Footer */}
            <div className="flex items-center text-xs text-gray-500 space-x-4 pt-3 border-t border-gray-100">
                <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>Creada: {formatDate(task.createdAt)}</span>
                </div>
                {task.updatedAt !== task.createdAt && (
                    <div className="flex items-center">
                        <span>Actualizada: {formatDate(task.updatedAt)}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskCard;