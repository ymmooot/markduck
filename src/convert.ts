import { CreateElement } from 'vue';
import unified, { Plugin, Settings } from 'unified';
import remarkParse from 'remark-parse';
import remarkToRehype from 'remark-rehype';

import remarkVue, { UserRemarkVueOption, ComponentRegisterOption } from './remark-vue';

type PluginOption = Plugin | [Plugin, Settings];
export type Option = {
  components?: ComponentRegisterOption;
  sanitizeScheme?: object;
  remarkPlugins?: PluginOption[];
  rehypePlugins?: PluginOption[];
};

const convert = (createElement: CreateElement, markdown: string, option: Option) => {
  const remarkPlugins = option?.remarkPlugins || [];
  const rehypePlugins = option?.rehypePlugins || [];

  const isHast = !!rehypePlugins.length;
  const remarkVueOption: UserRemarkVueOption = {
    isHast,
    createElement,
    components: option.components,
    sanitizeScheme: option.sanitizeScheme,
  };

  const plugins = [
    remarkParse,
    ...remarkPlugins,
    isHast ? remarkToRehype : undefined,
    ...rehypePlugins,
    [remarkVue, remarkVueOption],
  ];

  const processor = plugins.reduce((pipe, plugin: PluginOption) => {
    if (Array.isArray(plugin)) {
      return pipe.use(plugin[0], plugin[1] || {});
    }
    return pipe.use(plugin);
  }, unified());
  const { contents } = processor.processSync(markdown);

  return contents;
};

export default convert;
