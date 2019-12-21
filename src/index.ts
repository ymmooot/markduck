import Vue from 'vue';
import convert, { Option } from './convert';

export default (option?: Option) => {
  return Vue.extend({
    name: 'markduck-root',
    props: { markdown: { type: String, required: true } },
    render(h): any {
      return convert(h, this.markdown, option);
    },
  });
};
