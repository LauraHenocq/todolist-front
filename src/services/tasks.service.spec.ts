import axios from 'axios';
import { describe, beforeEach, expect, it, vi } from 'vitest'
import { getTasks, getTask, createTask, updateTask, deleteTask } from './tasks.service'
import { TaskEntity, TaskStatus } from '@/models/task.entity'

vi.mock('axios');

describe('TaskService', () => {
  const mockTask = { id: 'task-id', title: 'Titre', description: 'Description', _status: 'TODO' };

  beforeEach(() => {
    vi.resetAllMocks()
  })

  describe('getTasks', () => {
    it('should return an array of task entities when the call succeed', async () => {
      (axios.get as vi.Mock).mockResolvedValue({ data: [mockTask] });

      const result = await getTasks()
      expect(result).toEqual([mockTask]);
    });

    it('should throw an error when the call failed', async () => {
        (axios.get as vi.Mock).mockRejectedValue(new Error('An internal servor error occured'));

      try {
        await getTasks()
      } catch(e) {
        expect(e).toEqual(new Error('An internal servor error occured'));
      }
    });
  });

  describe('createTask', () => {
    const createTaskInput = {
      title: 'Title',
      description: 'Description',
    }

    it('should return the task id when the call succeed', async () => {
      (axios.post as vi.Mock).mockResolvedValue({ data : 'task-id'});

      const result = await createTask(createTaskInput);
      expect(result).toBe('task-id')
    })

    it('should throw an error when the call failed', async () => {
      (axios.post as vi.Mock).mockRejectedValue(new Error('An internal servor error occured'));

      try {
        await createTask(createTaskInput);
      } catch(e) {
        expect(e).toEqual(new Error('An internal servor error occured'));
      }
    });
  })

  describe('updateTask', () => {
    const updateTaskInput = {
      title: 'Updated Task',
      description: 'Updated Description',
      status: TaskStatus.DOING,
    }

    it('should return the task id when the call succeed', async () => {
      (axios.put as vi.Mock).mockResolvedValue({ data : 'task-id'});
  
      const result = await updateTask('task-id', updateTaskInput);
      expect(result).toBe('task-id');
    });

    it('should throw an error when the call failed', async () => {
      (axios.put as vi.Mock).mockRejectedValue(new Error('An internal servor error occured'));
  
      try {
          await updateTask('task-id', updateTaskInput);
      } catch(e) {
        expect(e).toEqual(new Error('An internal servor error occured'));
      }
    });
  })

  describe('deleteTask', () => {
    it('should return the task id when the call succeed', async () => {
      (axios.delete as vi.Mock).mockResolvedValue({ data : 'task-id'});
    
      const result = await deleteTask('task-id');
      expect(result).toBe('task-id');
    });

    it('should throw an error when the call failed', async () => {
      (axios.delete as vi.Mock).mockRejectedValue(new Error('An internal servor error occured'));
    
      try {
            await deleteTask('task-id');
      } catch(e) {
          expect(e).toEqual(new Error('An internal servor error occured'));
      }
    });
  })
})
