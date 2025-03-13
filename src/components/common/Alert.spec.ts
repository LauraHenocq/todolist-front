import { mount, VueWrapper } from '@vue/test-utils';
import { nextTick } from 'vue';
import { beforeEach, expect, it, describe } from 'vitest'
import { createVuetify } from 'vuetify';
import Alert from './Alert.vue';
import { AlertType } from '@/types/alert-type';

const vuetify = createVuetify();

describe('TaskCard', () => {
  let wrapper: VueWrapper

  const title = 'Titre de l\'alerte';
  const text = 'Description de de l\'alerte';
  const type = AlertType.success;

  const defaultProps = {
    title,
    text,
    type
  }

  beforeEach(() => {
    wrapper = mount(Alert, {
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
    it('should emit close event when the close element of the alert is clicked', async () => {
      (wrapper
        .findComponent('[data-cy="alert"]') as VueWrapper)
        .vm.$emit('click:close');

      await nextTick();

      expect(wrapper.emitted('close')).toHaveLength(1);
    });
  });
});