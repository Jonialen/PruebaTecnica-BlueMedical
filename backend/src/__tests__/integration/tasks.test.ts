// src/__tests__/integration/tasks.test.ts

import { describe, it, expect, jest, beforeAll } from '@jest/globals';
import request from 'supertest';
import app from '../../app.js';
import { prisma } from '../../prisma/client.js';
import { generateToken } from '../../utils/jwt.js';

jest.mock('../../prisma/client.js', () => ({
  prisma: {
    tasks: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

describe('Tasks Integration Tests', () => {
  let authToken: string;
  const mockUserId = 1;

  beforeAll(() => {
    authToken = generateToken({ id: mockUserId, email: 'test@example.com' });
  });

  describe('GET /api/tasks', () => {
    it('should return all tasks for authenticated user', async () => {
      const mockTasks = [
        {
          id: 1,
          title: 'Task 1',
          description: 'Description 1',
          status: 'PENDING',
          userId: mockUserId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          title: 'Task 2',
          description: 'Description 2',
          status: 'COMPLETED',
          userId: mockUserId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      (prisma.tasks.findMany as jest.Mock).mockResolvedValue(mockTasks);

      const response = await request(app)
        .get('/api/tasks')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data.tasks).toHaveLength(2);
      expect(response.body.data.count).toBe(2);
    });

    it('should return 401 without authentication token', async () => {
      const response = await request(app).get('/api/tasks');

      expect(response.status).toBe(401);
    });

    it('should filter tasks by status', async () => {
      const mockTasks = [
        {
          id: 1,
          title: 'Pending Task',
          status: 'PENDING',
          userId: mockUserId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      (prisma.tasks.findMany as jest.Mock).mockResolvedValue(mockTasks);

      const response = await request(app)
        .get('/api/tasks?status=PENDING')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.data.tasks).toHaveLength(1);
      expect(response.body.data.tasks[0].status).toBe('PENDING');
    });
  });

  describe('POST /api/tasks', () => {
    it('should create a new task', async () => {
      const newTask = {
        id: 1,
        title: 'New Task',
        description: 'Task description',
        status: 'PENDING',
        userId: mockUserId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (prisma.tasks.create as jest.Mock).mockResolvedValue(newTask);

      const response = await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          title: 'New Task',
          description: 'Task description',
        });

      expect(response.status).toBe(201);
      expect(response.body.status).toBe('success');
      expect(response.body.data.task.title).toBe('New Task');
    });

    it('should return 400 for invalid task data', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          title: 'AB', // Too short
        });

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
    });

    it('should return 400 for missing title', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          description: 'No title provided',
        });

      expect(response.status).toBe(400);
    });
  });

  describe('PUT /api/tasks/:id', () => {
    it('should update a task', async () => {
      const existingTask = {
        id: 1,
        title: 'Original Task',
        userId: mockUserId,
        status: 'PENDING',
      };

      const updatedTask = {
        ...existingTask,
        title: 'Updated Task',
        status: 'COMPLETED',
      };

      (prisma.tasks.findUnique as jest.Mock).mockResolvedValue(existingTask);
      (prisma.tasks.update as jest.Mock).mockResolvedValue(updatedTask);

      const response = await request(app)
        .put('/api/tasks/1')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          title: 'Updated Task',
          status: 'COMPLETED',
        });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data.task.title).toBe('Updated Task');
    });

    it('should return 400 for invalid task id', async () => {
      const response = await request(app)
        .put('/api/tasks/invalid')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          title: 'Updated Task',
        });

      expect(response.status).toBe(400);
    });
  });

  describe('DELETE /api/tasks/:id', () => {
    it('should delete a task', async () => {
      const taskToDelete = {
        id: 1,
        title: 'Task to delete',
        userId: mockUserId,
      };

      (prisma.tasks.findUnique as jest.Mock).mockResolvedValue(taskToDelete);
      (prisma.tasks.delete as jest.Mock).mockResolvedValue(taskToDelete);

      const response = await request(app)
        .delete('/api/tasks/1')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.message).toBe('Task deleted successfully');
    });

    it('should return 400 for invalid task id', async () => {
      const response = await request(app)
        .delete('/api/tasks/invalid')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(400);
    });
  });

  describe('GET /api/tasks/:id', () => {
    it('should get a task by id', async () => {
      const mockTask = {
        id: 1,
        title: 'Task 1',
        description: 'Description',
        status: 'PENDING',
        userId: mockUserId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (prisma.tasks.findUnique as jest.Mock).mockResolvedValue(mockTask);

      const response = await request(app)
        .get('/api/tasks/1')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data.task.id).toBe(1);
    });

    it('should return 400 for invalid id format', async () => {
      const response = await request(app)
        .get('/api/tasks/invalid')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(400);
    });
  });
});