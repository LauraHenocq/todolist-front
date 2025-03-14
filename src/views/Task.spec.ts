import { describe, it, expect, vi, beforeEach } from 'vitest';
import Task from '@/views/Task.vue';
import { createTestingPinia } from '@pinia/testing';
import { nextTick } from 'vue';
import { useTasksStore } from '@/stores/tasks.store';
import { TaskEntity, TaskStatus } from '@/models/task.entity';
import { mount, VueWrapper } from '@vue/test-utils';
import { createVuetify } from 'vuetify';
import EditTaskButton from '@/components/forms/EditTaskButton.vue';

const vuetify = createVuetify();

const mockUseRouter = {
  push: vi.fn(),
};

const mockUseRoute = {
    params: { id: 'task-id' },
  };
  
vi.mock('vue-router', () => ({
  useRoute: () => mockUseRoute,
  useRouter: () => mockUseRouter,
}));

describe('TaskView', () => {
  let wrapper: VueWrapper;
  const pinia = createTestingPinia();
  let tasksStore: ReturnType<typeof useTasksStore>;
  
  global.ResizeObserver = require('resize-observer-polyfill');
  
  beforeEach(() => {
    wrapper = mount(Task, {
      global: {
        plugins: [pinia, vuetify],
      },
    });
    tasksStore = useTasksStore();
    tasksStore.task = new TaskEntity({ title: 'Task Title', description: 'Task Description', _status: TaskStatus.TODO, id: 'task-id' });
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

  describe('Task retrieving', () => {
    it('should call getTaskById with the id params on mounted', async () => {
      expect(tasksStore.getTaskById).toHaveBeenCalledWith('task-id');
    });
  });

  describe('edit the task', () => {
    it('should open the edit task dialog form when the edit task button is clicked', async () => {
      await wrapper.findComponent(EditTaskButton).trigger('click');
      expect(wrapper.vm.isTaskEditionDialogOpen).toBe(true);
    });

    it('should edit the task and show success alert when the user validates the edition', async () => {
      const updateTaskInput = { title: 'Titre de la nouvelle tâche', description: 'Description de la nouvelle tâche', status: TaskStatus.DONE }
      
      await wrapper.vm.openTaskEditionDialog();
            
      await wrapper.vm.updateTask(updateTaskInput);
      
      expect(tasksStore.handleUpdateTask).toHaveBeenCalled();
      expect(tasksStore.handleUpdateTask).toHaveBeenCalledWith('task-id', updateTaskInput);
      expect(wrapper.vm.alertInfo.title).toBe('Tâche mise à jour');
      expect(wrapper.vm.isAlertVisible).toBe(true);
      });
  });
});