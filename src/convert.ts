import { VueConstructor, CreateElement, VNode } from "vue";
import unified from "unified";
import remarkParse from "remark-parse";
import remarkVDom from "remark-vdom";

export type ComponentRegisterOption = {
  [keyof: string]: VueConstructor<Vue>;
}

const markdownToVDom = (markdown: string): any => {
  const file = unified()
    .use(remarkParse)
    .use(remarkVDom)
    .processSync(markdown);
    return file.contents
};

const vdomToVNode = (createElement: CreateElement, vdoms: any[], components: ComponentRegisterOption): VNode[] => {
  const nodes: VNode[] = []
  for (let index = 0; index < vdoms.length; index++) {
    const vdom = vdoms[index];
    const children = vdom.children?.length > 0 ? vdomToVNode(createElement, vdom.children, components) : []

    // vdom that having text is a VirtualText
    if (vdom.text) {
      nodes.push(vdom.text)
      continue
    }

    const tagName = vdom.tagName?.toLowerCase()
    const customComponent = components[tagName]

    if (customComponent) {
      const node = createElement(customComponent, {
        props: vdom.properties.attributes,
      }, children)
      nodes.push(node)
      continue
    }

    const node = createElement(tagName, {
      attrs: vdom.properties?.attributes,
    }, children)
    nodes.push(node)
  }

  return nodes
}

const convert = (createElement: CreateElement, markdown: string, components: ComponentRegisterOption): VNode[] => {
  const tree = markdownToVDom(markdown)
  return vdomToVNode(createElement, [tree], components)
};

export default convert;
