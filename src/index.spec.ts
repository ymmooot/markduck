import Vue from 'vue';
import { shallowMount } from '@vue/test-utils';
import makeMarkduckComponent from './index';
import convert from './convert';
jest.mock('./convert');

test('make Markduck component', () => {
  const components = {
    img: Vue.extend({ name: 'MyCustomImage' }),
    a: Vue.extend({ name: 'MyCustomLink' }),
  };
  const textFilter = jest.fn();
  const Markduck = makeMarkduckComponent({
    components,
    textFilter,
  });
  const wrapper = shallowMount(Markduck, {
    propsData: {
      markdown: '# markdown contents',
    },
  });
  expect(wrapper.vm.$options.name).toBe('markduck-root');
  expect(convert).toHaveBeenCalledWith(expect.any(Function), '# markdown contents', { components, textFilter });
});
