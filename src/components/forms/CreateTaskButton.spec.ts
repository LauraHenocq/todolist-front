import { mount, VueWrapper } from '@vue/test-utils';
import { beforeEach, expect, it, describe } from 'vitest'
import { createVuetify } from 'vuetify';
import CreateTaskButton from './CreateTaskButton.vue';

const vuetify = createVuetify();

describe('CreateTaskButton', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = mount(CreateTaskButton, {
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