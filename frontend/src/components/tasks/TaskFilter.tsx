// src/components/tasks/TaskFilter.tsx
import type { TaskStatus } from '@models/task.types';

interface TaskFilterProps {
    currentFilter: TaskStatus | 'ALL';
    onFilterChange: (filter: TaskStatus | 'ALL') => void;
    taskCounts: {
        all: number;
        pending: number;
        inProgress: number;
        completed: number;
    };
}

const TaskFilter = ({ currentFilter, onFilterChange, taskCounts }: TaskFilterProps) => {
    const filters = [
        { value: 'ALL' as const, label: 'Todas', count: taskCounts.all },
        { value: 'PENDING' as const, label: 'Pendientes', count: taskCounts.pending },
        { value: 'IN_PROGRESS' as const, label: 'En Progreso', count: taskCounts.inProgress },
        { value: 'COMPLETED' as const, label: 'Completadas', count: taskCounts.completed },
    ];

    return (
        <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
                <button
                    key={filter.value}
                    onClick={() => onFilterChange(filter.value)}
                    className={`
            px-4 py-2 rounded-lg text-sm font-medium transition-all
            ${currentFilter === filter.value
                            ? 'bg-primary-600 text-white shadow-sm'
                            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                        }
          `}
                >
                    {filter.label}
                    <span
                        className={`
              ml-2 px-2 py-0.5 rounded-full text-xs font-semibold
              ${currentFilter === filter.value
                                ? 'bg-primary-700'
                                : 'bg-gray-200 text-gray-700'
                            }
            `}
                    >
                        {filter.count}
                    </span>
                </button>
            ))}
        </div>
    );
};

export default TaskFilter;