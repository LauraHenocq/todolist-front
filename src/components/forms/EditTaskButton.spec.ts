import { mount, VueWrapper } from '@vue/test-utils';
import { beforeEach, expect, it, describe } from 'vitest'
import { createVuetify } from 'vuetify';
import EditTaskButton from './EditTaskButton.vue';

const vuetify = createVuetify();

describe('EditTaskButton', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = mount(EditTaskButton, {
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