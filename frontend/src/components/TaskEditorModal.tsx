import { useState } from "react";
import { X, Save, Plus } from "lucide-react";
import type { Task } from "@hooks/useTaskStore";
import { Button } from "./ui/Button";

interface Props {
    task: Task | null;
    onClose: () => void;
    onSave: (data: Partial<Task>) => Promise<void>;
}

export const TaskEditorModal = ({ task, onClose, onSave }: Props) => {
    const [title, setTitle] = useState(task?.title || "");
    const [description, setDescription] = useState(task?.description || "");
    const isEditing = !!task;

    const handleSave = () => {
        onSave({ title, description });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
                {/* Header */}
                <div className="flex justify-between items-center mb-4 border-b pb-2">
                    <h2 className="text-lg font-semibold">
                        {isEditing ? "Editar tarea" : "Nueva tarea"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Campos */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">Título</label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Título de la tarea"
                        className="border rounded p-2 focus:outline-none focus:ring focus:ring-blue-100"
                    />

                    <label className="text-sm font-medium mt-2">Descripción</label>
                    <textarea
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Detalles opcionales"
                        className="border rounded p-2 focus:outline-none focus:ring focus:ring-blue-100"
                    />
                </div>

                {/* Acciones */}
                <div className="flex justify-end mt-4 gap-2">
                    <Button
                        variant="secondary"
                        onClick={onClose}
                        className="min-w-[90px]"
                    >
                        Descartar
                    </Button>
                    <Button onClick={handleSave} className="min-w-[90px]">
                        {isEditing ? (
                            <span className="flex items-center justify-center gap-1">
                                <Save className="w-4 h-4" /> Guardar
                            </span>
                        ) : (
                            <span className="flex items-center justify-center gap-1">
                                <Plus className="w-4 h-4" /> Crear
                            </span>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
};