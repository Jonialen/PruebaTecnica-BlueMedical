// src/pages/Tasks.tsx
import { useEffect, useState } from "react";
import { useTaskStore } from "@hooks/useTaskStore";
import { useAuthStore } from "@hooks/useAuthStore";
import { TaskCard } from "@components/TaskCard";
import { TaskEditorModal } from "@components/TaskEditorModal";
import { ThemeToggle } from "@components/ThemeToggle";
import { Search, Plus, LogOut, CheckSquare, Loader2 } from 'lucide-react';
import type { Task } from "@models/task.types";
import { Button } from "@components/ui/Button";
import { useNavigate } from "react-router-dom";

export default function Tasks() {
    const navigate = useNavigate();
    const { tasks, fetchTasks, addTask, updateTask, deleteTask, loading } = useTaskStore();
    const { logout, user } = useAuthStore();
    const [filter, setFilter] = useState<"ALL" | "PENDING" | "IN_PROGRESS" | "COMPLETED">("ALL");
    const [search, setSearch] = useState("");
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [isCreating, setIsCreating] = useState(false);

    useEffect(() => {
        fetchTasks(filter !== "ALL" ? filter : undefined);
    }, [filter, fetchTasks]);

    const filteredTasks = tasks.filter(
        (t) =>
            t.title.toLowerCase().includes(search.toLowerCase()) ||
            (t.description ?? "").toLowerCase().includes(search.toLowerCase())
    );

    const openTask = (task: Task) => {
        setSelectedTask(task);
        setIsCreating(false);
    };

    const openNewTask = () => {
        setIsCreating(true);
        setSelectedTask(null);
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const filters = [
        { key: "ALL", label: "Todas" },
        { key: "PENDING", label: "Pendientes" },
        { key: "IN_PROGRESS", label: "En Progreso" },
        { key: "COMPLETED", label: "Completadas" },
    ];

    const taskCount = filteredTasks.length;
    const completedCount = filteredTasks.filter(t => t.status === "COMPLETED").length;
    const pendingCount = filteredTasks.filter(t => t.status === "PENDING").length;
    const progressCount = filteredTasks.filter(t => t.status === "IN_PROGRESS").length;
    const completionRate = taskCount > 0 ? Math.round((completedCount / taskCount) * 100) : 0;

    return (
        <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--bg-primary)' }}>
            <header className="sticky top-0 z-20 border-b" style={{
                backgroundColor: 'var(--bg-secondary)',
                borderColor: 'var(--border-primary)',
                boxShadow: 'var(--shadow-sm)'
            }}>
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
                    {/* Top Bar */}
                    <div className="flex items-center justify-between !pt-2">
                        <div className="flex items-center gap-4 !px-2">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--brand-500)' }}>
                                <CheckSquare className="w-6 h-6 text-white" strokeWidth={2.5} />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                                    Mis Tareas
                                </h1>
                                {user && (
                                    <p className="text-sm mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                                        Hola, {user.name.split(' ')[0]}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-4 !px-2">
                            <ThemeToggle />
                            <button
                                onClick={handleLogout}
                                className="p-3 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
                                style={{ color: 'var(--text-secondary)' }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#FEE2E2';
                                    e.currentTarget.style.color = '#DC2626';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                    e.currentTarget.style.color = 'var(--text-secondary)';
                                }}
                                title="Cerrar sesión"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="!pt-4">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none" style={{ color: 'var(--text-tertiary)' }} />
                            <input
                                type="text"
                                placeholder="Buscar tareas por título o descripción..."
                                className="w-full !pl-12 !pr-4 py-4 rounded-xl border-2 transition-all focus:outline-none focus:ring-4"
                                style={{
                                    backgroundColor: 'var(--bg-secondary)',
                                    borderColor: 'var(--border-primary)',
                                    color: 'var(--text-primary)'
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = 'var(--brand-500)';
                                    e.target.style.boxShadow = '0 0 0 4px rgba(242, 131, 34, 0.1)';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = 'var(--border-primary)';
                                    e.target.style.boxShadow = 'none';
                                }}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="pb-8 flex items-center gap-5 overflow-x-auto scrollbar-none !px-2">
                        {filters.map(({ key, label }) => (
                            <button
                                key={key}
                                onClick={() => setFilter(key as typeof filter)}
                                className="flex-shrink-0 !px-5 text-sm font-semibold rounded-xl transition-all duration-200 hover:scale-105 border-2 shadow-sm hover:shadow-md"
                                style={{
                                    backgroundColor: filter === key ? 'var(--brand-500)' : 'var(--bg-secondary)',
                                    color: filter === key ? '#FFFFFF' : 'var(--text-primary)',
                                    borderColor: filter === key ? 'var(--brand-500)' : 'var(--border-primary)'
                                }}
                            >
                                {label}
                            </button>
                        ))}

                        <div className="flex-1" />

                        <Button
                            onClick={openNewTask}
                            size="md"
                            icon={<Plus className="w-5 h-5" />}
                        >
                            Nueva Tarea
                        </Button>
                    </div>
                </div>
            </header>

            {taskCount > 0 && (
                <div className="max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-10 !mt-3">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 m">
                        <div className="p-6 rounded-2xl border-2 transition-all duration-200 hover:scale-105 my-2" style={{
                            backgroundColor: 'var(--bg-secondary)',
                            borderColor: 'var(--border-primary)',
                            boxShadow: 'var(--shadow-sm)'
                        }}>
                            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>Total</p>
                            <p className="text-4xl font-black mt-2" style={{ color: 'var(--text-primary)' }}>{taskCount}</p>
                        </div>

                        <div className="p-6 rounded-2xl border-2 transition-all duration-200 hover:scale-105" style={{
                            backgroundColor: 'var(--green-bg)',
                            borderColor: 'var(--green-border)',
                            boxShadow: 'var(--shadow-sm)'
                        }}>
                            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--green-text)' }}>Completadas</p>
                            <p className="text-4xl font-black mt-2" style={{ color: 'var(--green-text)' }}>{completedCount}</p>
                        </div>

                        <div className="p-6 rounded-2xl border-2 transition-all duration-200 hover:scale-105" style={{
                            backgroundColor: 'var(--blue-bg)',
                            borderColor: 'var(--blue-border)',
                            boxShadow: 'var(--shadow-sm)'
                        }}>
                            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--blue-text)' }}>En Progreso</p>
                            <p className="text-4xl font-black mt-2" style={{ color: 'var(--blue-text)' }}>{progressCount}</p>
                        </div>

                        <div className="p-6 rounded-2xl border-2 transition-all duration-200 hover:scale-105" style={{
                            backgroundColor: 'var(--yellow-bg)',
                            borderColor: 'var(--yellow-border)',
                            boxShadow: 'var(--shadow-sm)'
                        }}>
                            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--yellow-text)' }}>Pendientes</p>
                            <p className="text-4xl font-black !mt-2" style={{ color: 'var(--yellow-text)' }}>{pendingCount}</p>
                        </div>
                    </div>

                    {/* Progress bar */}
                    <div className="!my-3 !p-2 rounded-2xl border-2 shadow-sm" style={{
                        backgroundColor: 'var(--bg-secondary)',
                        borderColor: 'var(--border-primary)'
                    }}>
                        <div className="flex items-center justify-between mb-3 ">
                            <span className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>Progreso General</span>
                            <span className="text-2xl font-black" style={{ color: 'var(--brand-500)' }}>{completionRate}%</span>
                        </div>
                        <div className="h-3 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                            <div
                                className="h-full rounded-full transition-all duration-1000 ease-out"
                                style={{
                                    width: `${completionRate}%`,
                                    backgroundColor: 'var(--brand-500)'
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8 sm:p-10 lg:p-12">
                <div className="max-w-7xl mx-auto">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center !py-5">
                            <Loader2 className="w-16 h-16 animate-spin" style={{ color: 'var(--brand-500)' }} />
                            <p className="mt-6 font-medium" style={{ color: 'var(--text-secondary)' }}>
                                Cargando tus tareas...
                            </p>
                        </div>
                    ) : filteredTasks.length === 0 ? (
                        <div className="flex flex-col items-center justify-center !py-5">
                            <div className="w-24 h-24 rounded-full flex items-center justify-center mb-6" style={{
                                backgroundColor: 'var(--bg-tertiary)'
                            }}>
                                <CheckSquare className="w-12 h-12" style={{ color: 'var(--text-tertiary)' }} />
                            </div>
                            <h3 className="text-xl font-bold !mb-2" style={{ color: 'var(--text-primary)' }}>
                                {search ? "No se encontraron tareas" : "¡Comienza tu día productivo!"}
                            </h3>
                            <p className="text-center max-w-md leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                {search
                                    ? "Intenta con otro término de búsqueda"
                                    : "Crea tu primera tarea y comienza a organizarte"}
                            </p>
                            {!search && (
                                <Button onClick={openNewTask} icon={<Plus className="w-5 h-5" />} size="lg">
                                    Crear primera tarea
                                </Button>
                            )}
                        </div>
                    ) : (
                        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                            {filteredTasks.map((task) => (
                                <TaskCard
                                    key={task.id}
                                    task={task}
                                    onDelete={() => deleteTask(task.id)}
                                    onUpdate={(data) => updateTask(task.id, data)}
                                    onClick={() => openTask(task)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </main>

            {/* Modal */}
            {(selectedTask || isCreating) && (
                <TaskEditorModal
                    task={selectedTask}
                    onClose={() => {
                        setSelectedTask(null);
                        setIsCreating(false);
                    }}
                    onSave={async (data) => {
                        if (selectedTask) {
                            await updateTask(selectedTask.id, data);
                        } else {
                            await addTask({ ...data, status: "PENDING" });
                        }
                        setSelectedTask(null);
                        setIsCreating(false);
                    }}
                />
            )}
        </div>
    );
}
