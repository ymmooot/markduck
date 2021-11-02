import { h } from 'vue-demi';
import unified, { Plugin, Settings } from 'unified';
import remarkParse from 'remark-parse';
import remarkToRehype from 'remark-rehype';
import remarkGfm from 'remark-gfm';

import remarkVue, { UserRemarkVueOption, ComponentRegisterOption } from './rehype-vue';

type CreateElement = typeof h

type PluginOption = Plugin | [Plugin, Settings];
export type Option = {
  components?: ComponentRegisterOption;
  sanitizeScheme?: object;
  remarkPlugins?: PluginOption[];
  rehypePlugins?: PluginOption[];
};

const convert = (createElement: CreateElement, markdown: string, option: Option, isVue3: boolean) => {
  const remarkPlugins = option?.remarkPlugins || [];
  const rehypePlugins = option?.rehypePlugins || [];

  const remarkVueOption: UserRemarkVueOption = {
    createElement,
    components: option.components,
    sanitizeScheme: option.sanitizeScheme,
    isVue3,
  };

  // prettier-ignore
  const plugins = [
    remarkGfm,
    remarkParse,
    ...remarkPlugins,
    remarkToRehype,
    ...rehypePlugins,
    [remarkVue, remarkVueOption]
  ];

  const processor = plugins.reduce((pipe, plugin: PluginOption) => {
    if (Array.isArray(plugin)) {
      return pipe.use(plugin[0], plugin[1] || {});
    }
    return pipe.use(plugin);
  }, unified());
  const { result } = processor.processSync(markdown);

  return result;
};

export default convert;
