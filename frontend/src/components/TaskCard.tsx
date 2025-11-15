import { CheckCircle2, Clock, RefreshCcw, Trash2 } from "lucide-react";
import { formatDate } from "../utils/formatDate";
import { clsx } from "clsx";
import type { Task } from "../hooks/useTaskStore";

interface TaskCardProps {
    task: Task;
    onDelete: () => void;
    onUpdate: (data: Partial<Task>) => void;
    onClick?: () => void; // clic general para abrir modal si se desea
}

export const TaskCard = ({ task, onDelete, onUpdate, onClick }: TaskCardProps) => {
    const { title, description, status, createdAt } = task;

    // 🔁 Cambia el estado en ciclo: PENDING → IN_PROGRESS → COMPLETED → PENDING
    const nextStatus = () => {
        if (status === "PENDING") return "IN_PROGRESS";
        if (status === "IN_PROGRESS") return "COMPLETED";
        return "PENDING";
    };

    const handleStatusChange = (e: React.MouseEvent) => {
        e.stopPropagation(); // evita abrir el modal al cambiar estado
        const newStatus = nextStatus();
        onUpdate({ status: newStatus });
    };

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation(); // evita abrir el modal al eliminar
        onDelete();
    };

    return (
        <div
            onClick={onClick} // solo clic vacío abre el modal (controlado desde Tasks)
            className="bg-white rounded-md shadow-sm border hover:shadow-md transition cursor-pointer flex justify-between items-start p-4"
        >
            {/* Lado izquierdo: info */}
            <div className="flex-1 pr-4">
                <h3 className="font-semibold text-gray-800">{title}</h3>
                {description && (
                    <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
                )}
                <p className="text-xs text-gray-400 mt-1">{formatDate(createdAt)}</p>

                <button
                    onClick={handleStatusChange}
                    className={clsx(
                        "mt-2 text-xs font-medium px-2 py-1 rounded-full transition-colors flex items-center gap-1",
                        status === "COMPLETED" &&
                        "bg-green-100 text-green-700 hover:bg-green-200",
                        status === "PENDING" &&
                        "bg-yellow-100 text-yellow-700 hover:bg-yellow-200",
                        status === "IN_PROGRESS" &&
                        "bg-blue-100 text-blue-700 hover:bg-blue-200"
                    )}
                >
                    {status === "PENDING" && <Clock className="w-4 h-4" />}
                    {status === "IN_PROGRESS" && <RefreshCcw className="w-4 h-4" />}
                    {status === "COMPLETED" && <CheckCircle2 className="w-4 h-4" />}
                    <span className="capitalize">{status.replace("_", " ").toLowerCase()}</span>
                </button>
            </div>

            {/* Lado derecho: borrar */}
            <button
                onClick={handleDelete}
                className="text-red-500 hover:text-red-700 mt-1"
                title="Eliminar tarea"
            >
                <Trash2 className="w-4 h-4" />
            </button>
        </div>
    );
};