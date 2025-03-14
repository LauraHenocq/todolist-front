import { mount, VueWrapper } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Homeview from '@/views/HomeView.vue';
import CreateTaskButton from '@/components/forms/CreateTaskButton.vue';
import { createTestingPinia } from '@pinia/testing';
import { useTasksStore } from '@/stores/tasks.store';
import { createVuetify } from 'vuetify';
import { TaskEntity, TaskStatus } from '@/models/task.entity';
import RouteNames from '@/router/constants';
import { nextTick } from 'vue';

const vuetify = createVuetify();

const mockUseRouter = {
  push: vi.fn(),
};

vi.mock('vue-router', () => ({
  useRouter: () => mockUseRouter,
}));

describe('HomeView', () => {
  let wrapper: VueWrapper;
  const pinia = createTestingPinia();
  let tasksStore: ReturnType<typeof useTasksStore>;

  global.ResizeObserver = require('resize-observer-polyfill');

  beforeEach(() => {
    wrapper = mount(Homeview, {
      global: {
        plugins: [pinia, vuetify],
      },
    });
    tasksStore = useTasksStore();
    tasksStore.tasks = [new TaskEntity({ title: 'Task Title', description: 'Task Description', _status: TaskStatus.TODO, id: 'task-id' })];
  });

  describe('render', () => {
    it('should render', () => {
      expect(wrapper.html()).toMatchSnapshot();
    });

    it('should show loading spinner when data is loading', async () => {
      wrapper.vm.isLoading = true;
      await nextTick();
      expect(wrapper.html()).toMatchSnapshot();
    });
  });

  describe('create a task', () => {
    it('should open task creation dialog when the user clicks on the create task button', async () => {
      await wrapper.findComponent(CreateTaskButton).trigger('click');
      expect(wrapper.vm.isTaskCreationDialogOpen).toBe(true);
    });
    
    it('should create a task and show success alert when the user validates the creation', async () => {
      const newTaskInput = { title: 'Titre de la nouvelle tâche', description: 'Description de la nouvelle tâche' }
    
      await wrapper.vm.openTaskCreationDialog();
          
      await wrapper.vm.createTask(newTaskInput);
    
      expect(tasksStore.handleCreateTask).toHaveBeenCalled();
      expect(tasksStore.handleCreateTask).toHaveBeenCalledWith(newTaskInput);
      expect(wrapper.vm.alertInfo.title).toBe('Tâche créée');
      expect(wrapper.vm.isAlertVisible).toBe(true);
    });
  });

  describe('delete a task', () => {
    it('should open the task deletion dialog when the user cliks on the delete button', async () => {
      await wrapper.vm.openTaskDeletionDialog('task-id-1');
      expect(wrapper.vm.isTaskDeletionDialogOpen).toBe(true);
      expect(wrapper.vm.selectedTaskId).toBe('task-id-1');
    });
    
    it('should delete the task and show success alert when the user validates the deletion', async () => {
      await wrapper.vm.openTaskDeletionDialog('task-id-1');
      await wrapper.vm.deleteTask('task-id-1');
    
      expect(tasksStore.handleDeleteTask).toHaveBeenCalledWith('task-id-1');
      expect(wrapper.vm.alertInfo.title).toBe('Tâche supprimée');
      expect(wrapper.vm.isAlertVisible).toBe(true);
    });
  });

  describe('go to task information', () => {
    it('should navigate to task information when the user clicks on the task', async () => {
      wrapper.find('[data-cy="task-card"]').trigger('click');
          
      await nextTick();
    
      expect(mockUseRouter.push).toHaveBeenCalledWith({
        name: RouteNames.TASK_INFORMATION,
        params: {
          id: 'task-id',
        },
      });
    });
  });
});