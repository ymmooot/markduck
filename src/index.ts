import Vue from 'vue';
import convert, { Option } from './convert';

export default (_option?: Option) => {
  const option: Option = {
    remarkPlugins: _option?.remarkPlugins || [],
    components: _option?.components || {},
  };

  return Vue.extend({
    name: 'markduck-root',
    props: { markdown: { type: String, required: true } },
    render(h) {
      const nodes = convert(h, this.markdown, option);
      return h('div', nodes);
    },
  });
};
