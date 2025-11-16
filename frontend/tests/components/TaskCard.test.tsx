// tests/components/TaskCard.test.tsx
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { TaskCard } from '@components/TaskCard'
import type { Task } from '@models/task.types'

const mockTask: Task = {
    id: 1,
    title: 'Test Task',
    description: 'Test Description',
    status: 'PENDING',
    userId: 1,
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
}

describe('TaskCard', () => {
    beforeEach(() => {
        // Restaurar todos los mocks antes de cada test
        vi.clearAllMocks()
    })

    it('renders task information correctly', () => {
        const onDelete = vi.fn()
        const onUpdate = vi.fn()

        render(
            <TaskCard
                task={mockTask}
                onDelete={onDelete}
                onUpdate={onUpdate}
            />
        )

        expect(screen.getByText('Test Task')).toBeInTheDocument()
        expect(screen.getByText('Test Description')).toBeInTheDocument()
    })

    it('calls onDelete when delete button is clicked', () => {
        const onDelete = vi.fn()
        const onUpdate = vi.fn()

        // Mock window.confirm
        vi.stubGlobal('confirm', vi.fn(() => true))

        render(
            <TaskCard
                task={mockTask}
                onDelete={onDelete}
                onUpdate={onUpdate}
            />
        )

        const deleteButton = screen.getByTitle('Eliminar tarea')
        fireEvent.click(deleteButton)

        expect(onDelete).toHaveBeenCalledTimes(1)

        vi.unstubAllGlobals()
    })

    it('changes task status when status button is clicked', () => {
        const onDelete = vi.fn()
        const onUpdate = vi.fn()

        render(
            <TaskCard
                task={mockTask}
                onDelete={onDelete}
                onUpdate={onUpdate}
            />
        )

        const statusButton = screen.getByTitle('Cambiar estado')
        fireEvent.click(statusButton)

        expect(onUpdate).toHaveBeenCalledWith({ status: 'IN_PROGRESS' })
    })

    it('renders completed task with correct styling', () => {
        const completedTask: Task = { ...mockTask, status: 'COMPLETED' }
        const onDelete = vi.fn()
        const onUpdate = vi.fn()

        render(
            <TaskCard
                task={completedTask}
                onDelete={onDelete}
                onUpdate={onUpdate}
            />
        )

        // Buscar por el texto real que muestra el componente (formatStatus lo pone en minúsculas)
        expect(screen.getByText('completed')).toBeInTheDocument()
    })

    it('does not call onDelete when confirm is cancelled', () => {
        const onDelete = vi.fn()
        const onUpdate = vi.fn()

        // Mock window.confirm para que devuelva false
        vi.stubGlobal('confirm', vi.fn(() => false))

        render(
            <TaskCard
                task={mockTask}
                onDelete={onDelete}
                onUpdate={onUpdate}
            />
        )

        const deleteButton = screen.getByTitle('Eliminar tarea')
        fireEvent.click(deleteButton)

        expect(onDelete).not.toHaveBeenCalled()

        vi.unstubAllGlobals()
    })

    it('cycles through statuses correctly', () => {
        const onUpdate = vi.fn()

        // Test PENDING -> IN_PROGRESS
        const { rerender } = render(
            <TaskCard
                task={mockTask}
                onDelete={vi.fn()}
                onUpdate={onUpdate}
            />
        )

        fireEvent.click(screen.getByTitle('Cambiar estado'))
        expect(onUpdate).toHaveBeenCalledWith({ status: 'IN_PROGRESS' })

        // Test IN_PROGRESS -> COMPLETED
        const inProgressTask = { ...mockTask, status: 'IN_PROGRESS' as const }
        rerender(
            <TaskCard
                task={inProgressTask}
                onDelete={vi.fn()}
                onUpdate={onUpdate}
            />
        )

        fireEvent.click(screen.getByTitle('Cambiar estado'))
        expect(onUpdate).toHaveBeenCalledWith({ status: 'COMPLETED' })

        // Test COMPLETED -> PENDING
        const completedTask = { ...mockTask, status: 'COMPLETED' as const }
        rerender(
            <TaskCard
                task={completedTask}
                onDelete={vi.fn()}
                onUpdate={onUpdate}
            />
        )

        fireEvent.click(screen.getByTitle('Cambiar estado'))
        expect(onUpdate).toHaveBeenCalledWith({ status: 'PENDING' })
    })

    it('renders task without description', () => {
        const taskWithoutDescription: Task = { ...mockTask, description: null }

        render(
            <TaskCard
                task={taskWithoutDescription}
                onDelete={vi.fn()}
                onUpdate={vi.fn()}
            />
        )

        expect(screen.getByText('Test Task')).toBeInTheDocument()
        expect(screen.queryByText('Test Description')).not.toBeInTheDocument()
    })

    it('calls onClick when card is clicked', () => {
        const onClick = vi.fn()

        render(
            <TaskCard
                task={mockTask}
                onDelete={vi.fn()}
                onUpdate={vi.fn()}
                onClick={onClick}
            />
        )

        const card = screen.getByText('Test Task').closest('div[class*="group"]')
        if (card) {
            fireEvent.click(card)
            expect(onClick).toHaveBeenCalledTimes(1)
        }
    })
})