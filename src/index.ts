import Vue, { VueConstructor } from 'vue';
import convert from './convert'

export type ComponentRegisterOption = {
  'image': VueConstructor<Vue>;
}

export default (components: ComponentRegisterOption) => {
  return Vue.extend({
    name: 'markduck-root',
    props: {
      markdown: {
        type: String,
        required: true,
      }
    },
    render (h) {
      const nodes = convert(h, this.markdown, components)
      return h('div', nodes)
    }
  })
}
