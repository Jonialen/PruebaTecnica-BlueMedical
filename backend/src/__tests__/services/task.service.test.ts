// src/__tests__/services/task.service.test.ts

import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { TaskService } from '../../services/tasks.service.js';
import { TaskRepository } from '../../repositories/task.repository.js';
import { AppError } from '../../middlewares/error.middleware.js';

jest.mock('../../repositories/task.repository.js');

describe('TaskService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('list', () => {
    it('should return all tasks for a user', async () => {
      const mockTasks = [
        { id: 1, title: 'Task 1', userId: 1, status: 'PENDING' },
        { id: 2, title: 'Task 2', userId: 1, status: 'COMPLETED' },
      ];

      (TaskRepository.findAllByUser as jest.Mock).mockResolvedValue(mockTasks);

      const result = await TaskService.list(1);

      expect(result).toEqual(mockTasks);
      expect(TaskRepository.findAllByUser).toHaveBeenCalledWith(1, undefined);
    });

    it('should filter tasks by status', async () => {
      const mockTasks = [
        { id: 1, title: 'Task 1', userId: 1, status: 'PENDING' },
      ];

      (TaskRepository.findAllByUser as jest.Mock).mockResolvedValue(mockTasks);

      const result = await TaskService.list(1, 'PENDING');

      expect(result).toEqual(mockTasks);
      expect(TaskRepository.findAllByUser).toHaveBeenCalledWith(1, 'PENDING');
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
        status: 'PENDING',
        userId: 1,
      };

      (TaskRepository.create as jest.Mock).mockResolvedValue(mockTask);

      const result = await TaskService.create(1, {
        title: 'New Task',
        description: 'Task description',
      });

      expect(result).toEqual(mockTask);
      expect(TaskRepository.create).toHaveBeenCalledWith({
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
        status: 'IN_PROGRESS',
        userId: 1,
      };

      (TaskRepository.create as jest.Mock).mockResolvedValue(mockTask);

      await TaskService.create(1, {
        title: 'New Task',
        status: 'IN_PROGRESS',
      });

      expect(TaskRepository.create).toHaveBeenCalledWith({
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
        status: 'PENDING',
      };

      const updatedTask = {
        ...mockTask,
        title: 'Updated Task',
        status: 'COMPLETED',
      };

      (TaskRepository.findById as jest.Mock).mockResolvedValue(mockTask);
      (TaskRepository.update as jest.Mock).mockResolvedValue(updatedTask);

      const result = await TaskService.update(1, 1, {
        title: 'Updated Task',
        status: 'COMPLETED',
      });

      expect(result).toEqual(updatedTask);
      expect(TaskRepository.update).toHaveBeenCalledWith(1, {
        title: 'Updated Task',
        status: 'COMPLETED',
      });
    });

    it('should throw error if task not found', async () => {
      (TaskRepository.findById as jest.Mock).mockResolvedValue(null);

      await expect(
        TaskService.update(999, 1, { title: 'Updated' })
      ).rejects.toThrow(new AppError(404, 'Task not found'));
    });

    it('should throw error if user does not own the task', async () => {
      const mockTask = {
        id: 1,
        title: 'Task',
        userId: 2, // Different user
      };

      (TaskRepository.findById as jest.Mock).mockResolvedValue(mockTask);

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
      };

      (TaskRepository.findById as jest.Mock).mockResolvedValue(mockTask);
      (TaskRepository.remove as jest.Mock).mockResolvedValue(mockTask);

      await TaskService.remove(1, 1);

      expect(TaskRepository.remove).toHaveBeenCalledWith(1);
    });

    it('should throw error if task not found', async () => {
      (TaskRepository.findById as jest.Mock).mockResolvedValue(null);

      await expect(TaskService.remove(999, 1)).rejects.toThrow(
        new AppError(404, 'Task not found')
      );
    });

    it('should throw error if user does not own the task', async () => {
      const mockTask = {
        id: 1,
        userId: 2,
      };

      (TaskRepository.findById as jest.Mock).mockResolvedValue(mockTask);

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
      };

      (TaskRepository.findById as jest.Mock).mockResolvedValue(mockTask);

      const result = await TaskService.getById(1, 1);

      expect(result).toEqual(mockTask);
    });

    it('should throw error if task not found', async () => {
      (TaskRepository.findById as jest.Mock).mockResolvedValue(null);

      await expect(TaskService.getById(999, 1)).rejects.toThrow(
        new AppError(404, 'Task not found')
      );
    });

    it('should throw error if user does not own the task', async () => {
      const mockTask = {
        id: 1,
        userId: 2,
      };

      (TaskRepository.findById as jest.Mock).mockResolvedValue(mockTask);

      await expect(TaskService.getById(1, 1)).rejects.toThrow(
        new AppError(403, "You don't have permission to view this task")
      );
    });
  });
});