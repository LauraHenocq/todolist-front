import { describe, beforeEach, afterEach, expect, it, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useTasksStore } from '@/stores/tasks.store';
import { getTasks, getTask, createTask, updateTask, deleteTask } from '@/services';
import { TaskEntity, TaskStatus } from '@/models/task.entity';

vi.mock('@/services', () => ({
  getTasks: vi.fn(),
  getTask: vi.fn(),
  createTask: vi.fn(),
  updateTask: vi.fn(),
  deleteTask: vi.fn(),
}));

describe('Tasks Store', () => {
  let store: ReturnType<typeof useTasksStore>;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useTasksStore();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('getAllTasks', () => {
    it('should retrieve all tasks', async () => {
      const tasksFromApi = [{ id: '1', title: 'Test Task', description: 'Description', status: TaskStatus.TODO }];
      (getTasks as vi.Mock).mockResolvedValue(tasksFromApi);
        
      await store.getAllTasks();
        
      expect(store.tasks).toHaveLength(1);
      expect(store.tasks[0]).toEqual(TaskEntity.fromApi(tasksFromApi[0]));
    });
  });

  describe('getTaskById', () => {
    it('should retrieve a task by id', async () => {
      const taskFromApi = { id: '1', title: 'Test Task', description: 'Description', status: TaskStatus.TODO };
      (getTask as vi.Mock).mockResolvedValue(taskFromApi);
        
      await store.getTaskById('1');
        
      expect(store.task).toEqual(TaskEntity.fromApi(taskFromApi));
    });
  });

  describe('handleCreateTask', () => {
    it('should create a task', async () => {
      const createTaskInput = { title: 'New Task', description: 'Description' };
      const newTaskId = 'task-id';
      (createTask as vi.Mock).mockResolvedValue(newTaskId);
        
      await store.handleCreateTask(createTaskInput);
        
      expect(store.tasks).toHaveLength(1);
      expect(store.tasks[0]).toEqual(new TaskEntity({ ...createTaskInput, _status: TaskStatus.TODO, id: newTaskId }));
    });
  });

  describe('handleUdpateTask', () => {
    it('should update a task', async () => {
      const taskId = 'task-id';
      const updateTaskInput = { title: 'Updated Task', description: 'Updated Description', status: TaskStatus.DONE };
      (updateTask as vi.Mock).mockResolvedValue(undefined);
        
      store.tasks = [new TaskEntity({ title: 'Task', description: 'Description', _status: TaskStatus.TODO, id: 'task-id' })];
    
      await store.handleUpdateTask(taskId, updateTaskInput);
        
      expect(store.tasks[0]).toEqual(new TaskEntity({ ...updateTaskInput, _status: TaskStatus.DONE, id: taskId }));
    });
  });

  describe('handleDeleteTask', () => {
    it('should delete a task', async () => {
      const taskId = 'task-id';
      (deleteTask as vi.Mock).mockResolvedValue('The task "task-id" has been deleted successfully');
        
      store.tasks = [new TaskEntity({ title: 'Task', description: 'Description', _status: TaskStatus.TODO, id: 'task-id' })];
    
      await store.handleDeleteTask(taskId);
        
      expect(store.tasks).toHaveLength(0);
    });
  });
});