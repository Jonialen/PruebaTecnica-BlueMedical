import { CheckCircle2, Clock, Loader2, Trash2, ChevronRight, Calendar } from 'lucide-react';
import { formatDate } from "@utils/formatDate";
import { clsx } from "clsx";
import type { Task } from "@models/task.types";
import { formatStatus } from "@utils/helpers";

interface TaskCardProps {
    task: Task;
    onDelete: () => void;
    onUpdate: (data: Partial<Task>) => void;
    onClick?: () => void;
}

export const TaskCard = ({ task, onDelete, onUpdate, onClick }: TaskCardProps) => {
    const { title, description, status, createdAt } = task;

    const nextStatus = () => {
        if (status === "PENDING") return "IN_PROGRESS";
        if (status === "IN_PROGRESS") return "COMPLETED";
        return "PENDING";
    };

    const handleStatusChange = (e: React.MouseEvent) => {
        e.stopPropagation();
        const newStatus = nextStatus();
        onUpdate({ status: newStatus });
    };

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (confirm('¿Estás seguro de eliminar esta tarea?')) {
            onDelete();
        }
    };

    const statusConfig = {
        PENDING: {
            icon: Clock,
        },
        IN_PROGRESS: {
            icon: Loader2,
        },
        COMPLETED: {
            icon: CheckCircle2,
        },
    };

    const config = statusConfig[status];
    const Icon = config.icon;

    const getStatusColors = () => {
        switch (status) {
            case 'PENDING':
                return {
                    bg: 'var(--yellow-bg)',
                    text: 'var(--yellow-text)',
                    border: 'var(--yellow-border)'
                };
            case 'IN_PROGRESS':
                return {
                    bg: 'var(--blue-bg)',
                    text: 'var(--blue-text)',
                    border: 'var(--blue-border)'
                };
            case 'COMPLETED':
                return {
                    bg: 'var(--green-bg)',
                    text: 'var(--green-text)',
                    border: 'var(--green-border)'
                };
        }
    };

    const colors = getStatusColors();

    return (
        <div
            onClick={onClick}
            className="group relative overflow-hidden rounded-2xl transition-all duration-300 cursor-pointer hover:scale-[1.02] hover:-translate-y-1 active:scale-[0.98] border-2"
            style={{
                backgroundColor: 'var(--bg-secondary)',
                borderColor: 'var(--border-primary)',
                boxShadow: 'var(--shadow-sm)'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--brand-500)';
                e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-primary)';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
            }}
        >
            <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: colors.border }} />

            <div className="relative !p-7 flex flex-col gap-5">
                {/* Header with status button */}
                <div className="flex items-start gap-5">
                    <button
                        onClick={handleStatusChange}
                        className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-6 active:scale-95 border-2"
                        style={{
                            backgroundColor: colors.bg,
                            borderColor: colors.border
                        }}
                        title="Cambiar estado"
                    >
                        <Icon
                            className={clsx("w-6 h-6 transition-transform duration-300", status === "IN_PROGRESS" && "animate-spin")}
                            style={{ color: colors.text }}
                        />
                    </button>

                    <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-lg !mb-2 text-balance transition-colors duration-200" style={{ color: 'var(--text-primary)' }}>
                            {title}
                        </h3>

                        {description && (
                            <p className="text-sm line-clamp-2 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                {description}
                            </p>
                        )}
                    </div>
                </div>

                {/* Footer with metadata and actions */}
                <div className="flex items-center justify-between gap-4 !pt-3 border-t" style={{ borderColor: 'var(--border-primary)' }}>
                    <div className="flex items-center gap-3 flex-wrap">
                        <span className="inline-flex items-center gap-1.5 !px-3 !py-1.5 rounded-lg text-xs font-semibold border" style={{
                            backgroundColor: colors.bg,
                            color: colors.text,
                            borderColor: colors.border
                        }}>
                            <Icon className="w-3.5 h-3.5" />
                            {formatStatus(status)}
                        </span>

                        <span className="inline-flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-tertiary)' }}>
                            <Calendar className="w-3.5 h-3.5" />
                            {formatDate(createdAt)}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
                        <button
                            onClick={handleDelete}
                            className="!p-2.5 rounded-lg transition-all duration-200 hover:scale-110 active:scale-95"
                            style={{ color: 'var(--text-tertiary)' }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#FEE2E2';
                                e.currentTarget.style.color = '#DC2626';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.color = 'var(--text-tertiary)';
                            }}
                            title="Eliminar tarea"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>

                        <ChevronRight className="w-5 h-5" style={{ color: 'var(--brand-500)' }} />
                    </div>
                </div>
            </div>
        </div>
    );
};
