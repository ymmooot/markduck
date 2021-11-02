import { defineComponent, h } from 'vue-demi';
import convert, { Option } from './convert';

export default (option?: Option) => {
  return defineComponent({
    name: 'markduck-root',
    props: { markdown: { type: String, required: true } },
    render() {
      return convert(h, this.markdown, option);
    },
  });
};
