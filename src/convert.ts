import { VueConstructor, CreateElement, VNode as VueVNode } from 'vue';
import unified, { Plugin, Settings } from 'unified';
import remarkParse from 'remark-parse';
import remarkVDom from 'remark-vdom';
import { VNode, VText, VTree } from 'virtual-dom';

type ComponentRegisterFunc = (node: VNode, parentNode?: VNode) => VueConstructor<Vue> | undefined;

type ComponentRegisterOption = {
  [keyof: string]: VueConstructor<Vue> | ComponentRegisterFunc;
};

type UnifiedPlugin =
  | {
      plugin: Plugin;
      config: Settings;
    }
  | Plugin;

export type Option = {
  components: ComponentRegisterOption;
  remarkPlugins: UnifiedPlugin[];
};

const markdownToVDom = (markdown: string, plugins: UnifiedPlugin[]): any => {
  const p = [remarkParse, ...plugins, remarkVDom];
  const u = p.reduce((acc, plugin) => {
    if (plugin.name) {
      return acc.use(plugin);
    }
    return acc.use(plugin.plugin, plugin.config);
  }, unified());
  const file = u.processSync(markdown);

  return file.contents;
};

const isFunc = (customComponent): customComponent is ComponentRegisterFunc => typeof customComponent === 'function';
const isVText = (vdom): vdom is VText => vdom.type === 'VirtualText';
const isVNode = (vdom): vdom is VNode => vdom.type === 'VirtualNode';

const vdomToVNode = (
  createElement: CreateElement,
  vdoms: VTree[],
  parent: VNode | undefined,
  option: Option,
): (VueVNode | string)[] => {
  const nodes: (VueVNode | string)[] = [];

  for (let index = 0; index < vdoms.length; index++) {
    const vdom = vdoms[index];

    // VirtualText has no tag
    if (isVText(vdom)) {
      nodes.push(vdom.text);
      continue;
    }

    if (!isVNode(vdom)) {
      continue;
    }

    const children = vdom.children?.length > 0 ? vdomToVNode(createElement, vdom.children, vdom, option) : [];

    // get custom component
    const tagName = vdom.tagName?.toLowerCase();
    const customComponentOpt = option.components[tagName];
    const customComponent = isFunc(customComponentOpt) ? customComponentOpt(vdom, parent) : customComponentOpt;

    if (customComponent) {
      const node = createElement(
        customComponent,
        {
          props: vdom.properties.attributes,
        },
        children,
      );
      nodes.push(node);
      continue;
    }

    const node = createElement(
      tagName,
      {
        attrs: vdom.properties?.attributes,
      },
      children,
    );
    nodes.push(node);
  }

  return nodes;
};

const convert = (createElement: CreateElement, markdown: string, option: Option): (VueVNode | string)[] => {
  const tree = markdownToVDom(markdown, option.remarkPlugins);
  return vdomToVNode(createElement, [tree], undefined, option);
};

export default convert;
