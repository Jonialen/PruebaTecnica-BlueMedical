// src/__tests__/services/task.service.test.ts

import { describe, it, expect, jest, beforeEach } from '@jest/globals';

const mockFindAllByUser = jest.fn();
const mockFindById = jest.fn();
const mockCreateTask = jest.fn();
const mockUpdateTask = jest.fn();
const mockRemoveTask = jest.fn();

jest.unstable_mockModule('../../repositories/task.repository.js', () => ({
  TaskRepository: {
    findAllByUser: mockFindAllByUser,
    findById: mockFindById,
    create: mockCreateTask,
    update: mockUpdateTask,
    remove: mockRemoveTask,
  },
}));

const { TaskService } = await import('../../services/tasks.service.js');
const { AppError } = await import('../../middlewares/error.middleware.js');

describe('TaskService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('list', () => {
    it('should return all tasks for a user', async () => {
      const mockTasks = [
        { id: 1, title: 'Task 1', userId: 1, status: 'PENDING', description: null, createdAt: new Date(), updatedAt: new Date() },
        { id: 2, title: 'Task 2', userId: 1, status: 'COMPLETED', description: null, createdAt: new Date(), updatedAt: new Date() },
      ];

      mockFindAllByUser.mockResolvedValue(mockTasks);

      const result = await TaskService.list(1);

      expect(result).toEqual(mockTasks);
      expect(mockFindAllByUser).toHaveBeenCalledWith(1, undefined);
    });

    it('should filter tasks by status', async () => {
      const mockTasks = [
        { id: 1, title: 'Task 1', userId: 1, status: 'PENDING', description: null, createdAt: new Date(), updatedAt: new Date() },
      ];

      mockFindAllByUser.mockResolvedValue(mockTasks);

      const result = await TaskService.list(1, 'PENDING');

      expect(result).toEqual(mockTasks);
      expect(mockFindAllByUser).toHaveBeenCalledWith(1, 'PENDING');
    });

    it('should throw error for invalid status', async () => {
      await expect(TaskService.list(1, 'INVALID_STATUS')).rejects.toThrow(
        new AppError(400, 'Invalid status filter')
      );
    });
  });

  describe('create', () => {
    it('should create a new task', async () => {
      const mockTask = {
        id: 1,
        title: 'New Task',
        description: 'Task description',
        status: 'PENDING' as const,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockCreateTask.mockResolvedValue(mockTask);

      const result = await TaskService.create(1, {
        title: 'New Task',
        description: 'Task description',
      });

      expect(result).toEqual(mockTask);
      expect(mockCreateTask).toHaveBeenCalledWith({
        title: 'New Task',
        description: 'Task description',
        userId: 1,
        status: 'PENDING',
      });
    });

    it('should use provided status when creating task', async () => {
      const mockTask = {
        id: 1,
        title: 'New Task',
        description: null,
        status: 'IN_PROGRESS' as const,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockCreateTask.mockResolvedValue(mockTask);

      await TaskService.create(1, {
        title: 'New Task',
        status: 'IN_PROGRESS',
      });

      expect(mockCreateTask).toHaveBeenCalledWith({
        title: 'New Task',
        userId: 1,
        status: 'IN_PROGRESS',
      });
    });
  });

  describe('update', () => {
    it('should update a task successfully', async () => {
      const mockTask = {
        id: 1,
        title: 'Original Task',
        userId: 1,
        status: 'PENDING' as const,
        description: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const updatedTask = {
        ...mockTask,
        title: 'Updated Task',
        status: 'COMPLETED' as const,
      };

      mockFindById.mockResolvedValue(mockTask);
      mockUpdateTask.mockResolvedValue(updatedTask);

      const result = await TaskService.update(1, 1, {
        title: 'Updated Task',
        status: 'COMPLETED',
      });

      expect(result).toEqual(updatedTask);
      expect(mockUpdateTask).toHaveBeenCalledWith(1, {
        title: 'Updated Task',
        status: 'COMPLETED',
      });
    });

    it('should throw error if task not found', async () => {
      mockFindById.mockResolvedValue(null);

      await expect(
        TaskService.update(999, 1, { title: 'Updated' })
      ).rejects.toThrow(new AppError(404, 'Task not found'));
    });

    it('should throw error if user does not own the task', async () => {
      const mockTask = {
        id: 1,
        title: 'Task',
        userId: 2,
        status: 'PENDING' as const,
        description: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockFindById.mockResolvedValue(mockTask);

      await expect(
        TaskService.update(1, 1, { title: 'Updated' })
      ).rejects.toThrow(
        new AppError(403, "You don't have permission to update this task")
      );
    });
  });

  describe('remove', () => {
    it('should delete a task successfully', async () => {
      const mockTask = {
        id: 1,
        title: 'Task to delete',
        userId: 1,
        status: 'PENDING' as const,
        description: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockFindById.mockResolvedValue(mockTask);
      mockRemoveTask.mockResolvedValue(mockTask);

      await TaskService.remove(1, 1);

      expect(mockRemoveTask).toHaveBeenCalledWith(1);
    });

    it('should throw error if task not found', async () => {
      mockFindById.mockResolvedValue(null);

      await expect(TaskService.remove(999, 1)).rejects.toThrow(
        new AppError(404, 'Task not found')
      );
    });

    it('should throw error if user does not own the task', async () => {
      const mockTask = {
        id: 1,
        userId: 2,
        title: 'Task',
        status: 'PENDING' as const,
        description: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockFindById.mockResolvedValue(mockTask);

      await expect(TaskService.remove(1, 1)).rejects.toThrow(
        new AppError(403, "You don't have permission to delete this task")
      );
    });
  });

  describe('getById', () => {
    it('should return task by id', async () => {
      const mockTask = {
        id: 1,
        title: 'Task',
        userId: 1,
        status: 'PENDING' as const,
        description: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockFindById.mockResolvedValue(mockTask);

      const result = await TaskService.getById(1, 1);

      expect(result).toEqual(mockTask);
    });

    it('should throw error if task not found', async () => {
      mockFindById.mockResolvedValue(null);

      await expect(TaskService.getById(999, 1)).rejects.toThrow(
        new AppError(404, 'Task not found')
      );
    });

    it('should throw error if user does not own the task', async () => {
      const mockTask = {
        id: 1,
        userId: 2,
        title: 'Task',
        status: 'PENDING' as const,
        description: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockFindById.mockResolvedValue(mockTask);

      await expect(TaskService.getById(1, 1)).rejects.toThrow(
        new AppError(403, "You don't have permission to view this task")
      );
    });
  });
});