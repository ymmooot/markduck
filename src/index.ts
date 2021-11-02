import { defineComponent, h as h3} from 'vue-demi';
import convert, { Option } from './convert';

export default (option?: Option) => {
  return defineComponent({
    name: 'markduck-root',
    props: { markdown: { type: String, required: true } },
    render(h2): any {
      const isVue3 = typeof h2 !== 'function'
      const h = isVue3 ? h3 : h2
      return convert(h, this.markdown, option, isVue3);
    },
  });
};
