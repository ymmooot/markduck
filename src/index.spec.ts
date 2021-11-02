import { defineComponent } from 'vue-demi';
import { shallowMount } from '@vue/test-utils';
import makeMarkduckComponent from './index';
import convert from './convert';
jest.mock('./convert');

test('make Markduck component', () => {
  const components = {
    img: defineComponent({ name: 'MyCustomImage' }),
    a: defineComponent({ name: 'MyCustomLink' }),
  };
  const remarkPlugins = [];
  const Markduck = makeMarkduckComponent({
    components,
    remarkPlugins,
  });
  const wrapper = shallowMount(Markduck, {
    propsData: {
      markdown: '# markdown contents',
    },
  });
  expect(wrapper.vm.$options.name).toBe('markduck-root');
  expect(convert).toHaveBeenCalledWith(expect.any(Function), '# markdown contents', { components, remarkPlugins });
});
