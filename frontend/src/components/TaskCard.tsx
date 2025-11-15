import { CheckCircle2, Clock, RefreshCcw, Trash2 } from "lucide-react";
import { formatDate } from "@utils/formatDate";
import { clsx } from "clsx";
import type { Task } from "@models/task.types";
import { formatStatus, truncate } from "@utils/helpers";

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
        onDelete();
    };

    return (
        <div
            onClick={onClick}
            className="bg-white rounded-md shadow-sm border hover:shadow-md transition cursor-pointer flex justify-between items-start p-4"
        >
            <div className="flex-1 pr-4">
                <h3 className="font-semibold text-gray-800">{title}</h3>
                {description && (
                    <p className="text-sm text-gray-600">
                        {truncate(description, 80)}
                    </p>
                )}
                <p className="text-xs text-gray-400 mt-1">{formatDate(createdAt)}</p>

                <button
                    onClick={handleStatusChange}
                    className={clsx(
                        "mt-2 text-xs font-medium px-2 py-1 rounded-full transition-colors flex items-center gap-1",
                        status === "COMPLETED" && "bg-green-100 text-green-700 hover:bg-green-200",
                        status === "PENDING" && "bg-yellow-100 text-yellow-700 hover:bg-yellow-200",
                        status === "IN_PROGRESS" && "bg-blue-100 text-blue-700 hover:bg-blue-200"
                    )}
                >
                    {status === "PENDING" && <Clock className="w-4 h-4" />}
                    {status === "IN_PROGRESS" && <RefreshCcw className="w-4 h-4" />}
                    {status === "COMPLETED" && <CheckCircle2 className="w-4 h-4" />}
                    <span className="capitalize">{formatStatus(status)}</span>
                </button>
            </div>

            <button
                onClick={handleDelete}
                className="text-red-500 hover:text-red-700 mt-1"
                title="Eliminar tarea"
            >
                <Trash2 className="w-4 h-4" />
            </button>
        </div >
    );
};