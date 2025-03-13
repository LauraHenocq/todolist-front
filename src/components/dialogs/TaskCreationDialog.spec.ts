import { mount, VueWrapper } from '@vue/test-utils';
import { nextTick } from 'vue';
import { beforeEach, expect, it, describe, vi } from 'vitest'
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import TaskCreationDialog from './TaskCreationDialog.vue';
import 'vuetify/styles'; 

const vuetify = createVuetify({
  components,
  directives
});

describe('TaskCreationDialog', () => {
  let wrapper: VueWrapper
  const isOpen = true;

  const defaultProps = {
    isOpen
  }

  global.ResizeObserver = require('resize-observer-polyfill')

  beforeEach(() => {
    wrapper = mount(TaskCreationDialog, {
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

  describe.skip('actions', () => {
    it('should emit create-task event when the createTask event is emitted', async () => {
      (wrapper
        .findComponent('[data-cy="task-card-edit-task-button"]') as VueWrapper)
        .vm.$emit('createTask');

      await nextTick();

      expect(wrapper.emitted('create-task')).toHaveLength(1);
    });

    it('should submit the form when the validate task button is clicked', async () => {
      const submitFormSpy = vi.spyOn(wrapper.vm, 'submitForm');
      (wrapper
        .findComponent('[data-cy="validate-creation-task-button"]') as VueWrapper)
        .vm.$emit('click');

        await nextTick();

      expect(submitFormSpy).toHaveBeenCalled();
    });

    it('should emit cancel event when the cancel button is clicked', async () => {
        (wrapper
          .findComponent('[data-cy="cancel-creation-task-button"]') as VueWrapper)
          .vm.$emit('click');
  
          await nextTick();
  
        expect(wrapper.emitted('delete-task')).toHaveLength(1);
      });
  });
});