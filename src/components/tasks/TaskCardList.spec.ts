import { mount, VueWrapper } from '@vue/test-utils';
import { nextTick } from 'vue';
import { beforeEach, expect, it, describe } from 'vitest'
import { createVuetify } from 'vuetify';
import TaskCardList from './TaskCardsList.vue';
import { TaskEntity, TaskStatus } from '@/models/task.entity';

const vuetify = createVuetify();

describe('TaskCardsList', () => {
  let wrapper: VueWrapper
  const tasks = [
    new TaskEntity({
      title: 'Titre de la tâche 1',
      description: 'Description de la tâche 1',
      _status: TaskStatus.TODO,
      id: 'task-id-1'
    }),
    new TaskEntity({
      title: 'Titre de la tâche 2',
      description: 'Description de la tâche 2',
      _status: TaskStatus.TODO,
      id: 'task-id-2'
    })
  ]

  const defaultProps = {
    tasks
  }

  beforeEach(() => {
    wrapper = mount(TaskCardList, {
      props: defaultProps,
      global: {
        plugins: [vuetify],
      },
    });
  });

  describe('render', () => {
    it('should render', () => {
      expect(wrapper.html()).toMatchSnapshot();
    });
  });

  describe('actions', () => {
    it('should emit go-to-task event when the card is clicked', async () => {
      wrapper.find('[data-cy="task-card"]').trigger('click');
  
      expect(wrapper.emitted('go-to-task')).toHaveLength(1);
    });

    it('should emit go-to-task event when the edit task button is clicked', async () => {
      (wrapper
        .findComponent('[data-cy="task-card-edit-task-button"]') as VueWrapper)
        .vm.$emit('click');
      
        await nextTick();
    
      expect(wrapper.emitted('go-to-task')).toHaveLength(1);
    });
  
    it('should emit delete-task event when the delete task button is clicked', async () => {
      (wrapper
        .findComponent('[data-cy="task-card-delete-task-button"]') as VueWrapper)
        .vm.$emit('click');
  
      await nextTick();
  
      expect(wrapper.emitted('delete-task')).toHaveLength(1);
    });
  });
});