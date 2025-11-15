import { useEffect, useState } from "react";
import { useTaskStore } from "@hooks/useTaskStore";
import { useAuthStore } from "@hooks/useAuthStore";
import { TaskCard } from "@components/TaskCard";
import { TaskEditorModal } from "@components/TaskEditorModal";
import { Search, Plus, LogOut } from "lucide-react";
import type { Task } from "@models/task.types";

export default function Tasks() {
    const { tasks, fetchTasks, addTask, updateTask, deleteTask, loading } =
        useTaskStore();
    const { logout } = useAuthStore();
    const [filter, setFilter] = useState<
        "ALL" | "PENDING" | "IN_PROGRESS" | "COMPLETED"
    >("ALL");
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
        window.location.href = "/login";
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* HEADER */}
            <header className="sticky top-0 z-10 bg-white border-b shadow-sm p-3 flex flex-col gap-3">
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Buscar tareas por nombre o descripción..."
                        className="w-full pl-9 pr-3 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-100 outline-none"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button
                        onClick={handleLogout}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-600 transition"
                        title="Cerrar sesión"
                    >
                        <LogOut className="w-4 h-4" />
                    </button>
                </div>

                <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
                    {[
                        ["ALL", "Todas", "bg-gray-700", "bg-gray-200 text-gray-700"],
                        ["PENDING", "Pendientes", "bg-yellow-500", "bg-yellow-100 text-yellow-700"],
                        ["IN_PROGRESS", "En progreso", "bg-blue-600", "bg-blue-100 text-blue-700"],
                        ["COMPLETED", "Completadas", "bg-green-600", "bg-green-100 text-green-700"],
                    ].map(([key, label, activeColor, inactiveColor]) => (
                        <button
                            key={key}
                            onClick={() => setFilter(key as typeof filter)}
                            className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${filter === key
                                ? `${activeColor} text-white`
                                : `${inactiveColor} hover:opacity-80`
                                }`}
                        >
                            {label}
                        </button>
                    ))}

                    <button
                        onClick={openNewTask}
                        className="ml-auto flex items-center gap-1 px-3 py-1 text-xs font-medium bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
                    >
                        <Plus className="w-3 h-3" /> Nueva
                    </button>
                </div>
            </header>

            {/* MAIN */}
            <main className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 max-w-3xl mx-auto w-full">
                {loading ? (
                    <p className="text-center text-gray-500 mt-6">Cargando tareas...</p>
                ) : filteredTasks.length === 0 ? (
                    <p className="text-gray-500 text-center mt-6">
                        No hay tareas para mostrar.
                    </p>
                ) : (
                    filteredTasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onDelete={() => deleteTask(task.id)}
                            onUpdate={(data) => updateTask(task.id, data)}
                            onClick={() => openTask(task)}
                        />
                    ))
                )}
            </main>

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