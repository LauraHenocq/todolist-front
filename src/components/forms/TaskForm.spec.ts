import { mount, VueWrapper } from '@vue/test-utils';
import { nextTick } from 'vue';
import { beforeEach, expect, it, describe } from 'vitest'
import { createVuetify } from 'vuetify';
import TaskForm from './TaskForm.vue';
import { TaskEntity, TaskStatus } from '@/models/task.entity';

const vuetify = createVuetify();

describe('TaskCard', () => {
  let wrapper: VueWrapper
  const task = new TaskEntity({
    title: 'Titre de la tâche',
    description: 'Description de la tâche',
    _status: TaskStatus.TODO,
    id: 'task-id'
  });

  const isEditionMode = false;

  const defaultProps = {
    isEditionMode,
    task
  }

  beforeEach(() => {
    wrapper = mount(TaskForm, {
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
    describe('Creation mode', () => {
      it('should emit create-task event when the task form is submitted', async () => {
        await wrapper.find('#input-0').setValue('Test Title');
        await nextTick();
        await wrapper.find('#input-2').setValue('Test Description');
        await nextTick();
        await wrapper.vm.submitForm();
        await nextTick();
      
        expect(wrapper.emitted('create-task')![0]).toEqual([{
          title: 'Test Title',
          description: 'Test Description'
        }]);
        expect(wrapper.emitted('create-task')).toHaveLength(1);
      });
    });

    describe('Edition mode', () => {
      it('should emit update-task event when the task form is submit', async () => {
        wrapper = mount(TaskForm, {
          props: {
            ...defaultProps,
            isEditionMode: true,
          },
          global: {
            plugins: [vuetify],
          },
        });

        await wrapper.find('#input-0').setValue('Test Title');
        await nextTick();
        await wrapper.find('#input-2').setValue('Test Description');
        await nextTick();
        await wrapper.find('#input-2').setValue('Test Description');
        await nextTick();
        await wrapper.vm.submitForm();
        await nextTick();
      
        expect(wrapper.emitted('update-task')![0]).toEqual([{
          title: 'Test Title',
          description: 'Test Description',
          status: 'TODO'
        }]);
        expect(wrapper.emitted('update-task')).toHaveLength(1);
      });
    });
  });
});