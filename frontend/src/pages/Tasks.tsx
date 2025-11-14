// src/pages/Tasks.tsx
import { useEffect, useState, useMemo } from 'react';
import { Plus } from 'lucide-react';
import { useTasksStore } from '@store/tasksStore';
import Header from '@components/layout/Header';
import TaskCard from '@components/tasks/TaskCard';
import TaskFilter from '@components/tasks/TaskFilter';
import TaskForm from '@components/tasks/TaskForm';
import Modal from '@components/common/Modal';
import Button from '@components/common/Button';
import { Spinner, Alert } from '@components/common/Spinner';
import type { Task, CreateTaskData, UpdateTaskData } from '@models/task.types';

const Tasks = () => {
    const {
        tasks,
        filter,
        isLoading,
        error,
        selectedTask,
        fetchTasks,
        createTask,
        updateTask,
        deleteTask,
        setFilter,
        setSelectedTask,
        clearError,
    } = useTasksStore();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    // Filtrar tareas
    const filteredTasks = useMemo(() => {
        if (filter === 'ALL') return tasks;
        return tasks.filter((task) => task.status === filter);
    }, [tasks, filter]);

    // Contadores para filtros
    const taskCounts = useMemo(() => ({
        all: tasks.length,
        pending: tasks.filter((t) => t.status === 'PENDING').length,
        inProgress: tasks.filter((t) => t.status === 'IN_PROGRESS').length,
        completed: tasks.filter((t) => t.status === 'COMPLETED').length,
    }), [tasks]);

    const handleCreateTask = async (data: CreateTaskData) => {
        await createTask(data);
        setIsModalOpen(false);
        showSuccessMessage('Tarea creada exitosamente');
    };

    const handleUpdateTask = async (data: UpdateTaskData) => {
        if (selectedTask) {
            await updateTask(selectedTask.id, data);
            setIsModalOpen(false);
            showSuccessMessage('Tarea actualizada exitosamente');
        }
    };

    const handleDeleteTask = async (id: number) => {
        if (window.confirm('¿Estás seguro de eliminar esta tarea?')) {
            await deleteTask(id);
            showSuccessMessage('Tarea eliminada exitosamente');
        }
    };

    const handleEditTask = (task: Task) => {
        setSelectedTask(task);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedTask(null);
    };

    const handleNewTask = () => {
        setSelectedTask(null);
        setIsModalOpen(true);
    };

    const showSuccessMessage = (message: string) => {
        setSuccessMessage(message);
        setTimeout(() => setSuccessMessage(null), 3000);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Success Alert */}
                {successMessage && (
                    <div className="mb-6 animate-fade-in">
                        <Alert
                            type="success"
                            message={successMessage}
                            onClose={() => setSuccessMessage(null)}
                        />
                    </div>
                )}

                {/* Error Alert */}
                {error && (
                    <div className="mb-6 animate-fade-in">
                        <Alert type="error" message={error} onClose={clearError} />
                    </div>
                )}

                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">Mis Tareas</h2>
                            <p className="text-gray-600 mt-1">
                                Gestiona tus tareas de manera eficiente
                            </p>
                        </div>
                        <Button onClick={handleNewTask}>
                            <Plus className="h-5 w-5 mr-2" />
                            Nueva Tarea
                        </Button>
                    </div>

                    {/* Filters */}
                    <TaskFilter
                        currentFilter={filter}
                        onFilterChange={setFilter}
                        taskCounts={taskCounts}
                    />
                </div>

                {/* Tasks Grid */}
                {isLoading && tasks.length === 0 ? (
                    <div className="flex justify-center items-center py-20">
                        <Spinner size="lg" />
                    </div>
                ) : filteredTasks.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                            <svg
                                className="w-8 h-8 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            No hay tareas
                        </h3>
                        <p className="text-gray-600 mb-6">
                            {filter === 'ALL'
                                ? 'Comienza creando tu primera tarea'
                                : 'No hay tareas con este estado'}
                        </p>
                        {filter === 'ALL' && (
                            <Button onClick={handleNewTask}>
                                <Plus className="h-5 w-5 mr-2" />
                                Crear Primera Tarea
                            </Button>
                        )}
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {filteredTasks.map((task) => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                onEdit={handleEditTask}
                                onDelete={handleDeleteTask}
                            />
                        ))}
                    </div>
                )}
            </main>

            {/* Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={selectedTask ? 'Editar Tarea' : 'Nueva Tarea'}
            >
                <TaskForm
                    task={selectedTask}
                    onSubmit={selectedTask ? handleUpdateTask : handleCreateTask}
                    onCancel={handleCloseModal}
                />
            </Modal>
        </div>
    );
};

export default Tasks;