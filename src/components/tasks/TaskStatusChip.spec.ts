import { mount, VueWrapper } from '@vue/test-utils';
import { nextTick } from 'vue';
import { beforeEach, expect, it, describe } from 'vitest'
import { createVuetify } from 'vuetify';
import TaskStatusChip from './TaskStatusChip.vue';
import { TaskStatus } from '@/models/task.entity';

const vuetify = createVuetify();

describe('TaskStatusChip', () => {
  let wrapper: VueWrapper
  const status = TaskStatus.TODO;

  const defaultProps = {
    status
  }

  beforeEach(() => {
    wrapper = mount(TaskStatusChip, {
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
});