import { useState } from "react";
import { X, Save, Plus, FileText, Type } from 'lucide-react';
import type { Task } from "@models/task.types";
import { isValidTaskTitle } from "@utils/validators";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import clsx from "clsx";

interface Props {
    task: Task | null;
    onClose: () => void;
    onSave: (data: Partial<Task>) => Promise<void>;
}

export const TaskEditorModal = ({ task, onClose, onSave }: Props) => {
    const [title, setTitle] = useState(task?.title || "");
    const [description, setDescription] = useState(task?.description || "");
    const [error, setError] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const isEditing = !!task;

    const handleSave = async () => {
        if (!isValidTaskTitle(title)) {
            setError("El título debe tener entre 1 y 255 caracteres");
            return;
        }

        setError(null);
        setSaving(true);

        try {
            await onSave({ title, description: description || null });
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 animate-fade-in" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
            <div className="rounded-2xl w-full max-w-lg relative animate-scale-in border-2" style={{
                backgroundColor: 'var(--bg-secondary)',
                borderColor: 'var(--border-primary)',
                boxShadow: 'var(--shadow-lg)'
            }}>
                {/* Header */}
                <div className="flex justify-between items-center !p-4 border-b-2" style={{ borderColor: 'var(--border-primary)' }}>
                    <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{
                            backgroundColor: 'var(--brand-500)',
                            boxShadow: 'var(--shadow-sm)'
                        }}>
                            {isEditing ? (
                                <FileText className="w-5 h-5 text-white" />
                            ) : (
                                <Plus className="w-5 h-5 text-white" />
                            )}
                        </div>
                        <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                            {isEditing ? "Editar tarea" : "Nueva tarea"}
                        </h2>
                    </div>

                    <button
                        onClick={onClose}
                        className="!p-2.5 rounded-lg transition-all duration-200"
                        style={{ color: 'var(--text-secondary)' }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#FEE2E2';
                            e.currentTarget.style.color = '#DC2626';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = 'var(--text-secondary)';
                        }}
                        title="Cerrar"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="!p-3 space-y-6">
                    <Input
                        label="Título"
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                            setError(null);
                        }}
                        placeholder="Nombre de la tarea"
                        maxLength={255}
                        error={error || undefined}
                        icon={<Type className="w-4 h-4" />}
                    />

                    <div className="flex flex-col gap-2 !mt-2">
                        <label className="text-sm font-medium text-left !pl-2 !p-2" style={{ color: 'var(--text-primary)' }}>
                            Descripción
                        </label>
                        <div className="relative">
                            <textarea
                                rows={4}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Agrega detalles sobre la tarea (opcional)"
                                className={clsx(
                                    "w-full rounded-xl transition-all duration-200 border-2 resize-none",
                                    "focus:outline-none focus:ring-4",
                                    "!px-4 !py-3",
                                    "placeholder:text-[var(--text-tertiary)]"
                                )}
                                style={{
                                    backgroundColor: 'var(--bg-secondary)',
                                    borderColor: 'var(--border-primary)',
                                    color: 'var(--text-primary)',
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = 'var(--brand-500)';
                                    e.target.style.boxShadow = '0 0 0 4px rgba(242, 131, 34, 0.1)';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = 'var(--border-primary)';
                                    e.target.style.boxShadow = 'none';
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-4 !px-2 border-t-2 rounded-b-2xl" style={{
                    borderColor: 'var(--border-primary)',
                    backgroundColor: 'var(--bg-tertiary)'
                }}>
                    <Button
                        variant="secondary"
                        onClick={onClose}
                        disabled={saving}
                        size="md"
                    >
                        Cancelar
                    </Button>

                    <Button
                        onClick={handleSave}
                        loading={saving}
                        icon={isEditing ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        size="md"
                    >
                        {isEditing ? "Guardar cambios" : "Crear tarea"}
                    </Button>
                </div>
            </div>
        </div>
    );
};
