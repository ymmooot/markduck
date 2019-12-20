import { VueConstructor, CreateElement, VNode as VueVNode } from "vue";
import unified from "unified";
import remarkParse from "remark-parse";
import remarkVDom from "remark-vdom";
import { VNode, VText, VTree } from 'virtual-dom'

type ComponentRegisterFunc = (RVDom) => VueConstructor<Vue> | undefined

export type ComponentRegisterOption = {
  [keyof: string]: VueConstructor<Vue> | ComponentRegisterFunc;
}

const markdownToVDom = (markdown: string): any => {
  const file = unified()
    .use(remarkParse)
    .use(remarkVDom)
    .processSync(markdown);
    return file.contents
};

const isFunc = (customComponent): customComponent is ComponentRegisterFunc => typeof customComponent === "function"
const isVText = (vdom): vdom is VText => vdom.type === 'VirtualText'
const isVNode = (vdom): vdom is VNode => vdom.type === 'VirtualNode'

const vdomToVNode = (createElement: CreateElement, vdoms: VTree[], components: ComponentRegisterOption): (VueVNode | string)[] => {
  const nodes: (VueVNode | string)[] = []
  for (let index = 0; index < vdoms.length; index++) {
    const vdom = vdoms[index];

    // VirtualText has no tag
    if (isVText(vdom)) {
      nodes.push(vdom.text)
      continue
    }

    if (!isVNode(vdom)) {
      continue
    }

    const children = vdom.children?.length > 0 ? vdomToVNode(createElement, vdom.children, components) : []

    // get custom component
    const tagName = vdom.tagName?.toLowerCase()
    const customComponentOpt = components[tagName]
    const customComponent = isFunc(customComponentOpt) ? customComponentOpt(vdom) : customComponentOpt

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

const convert = (createElement: CreateElement, markdown: string, components: ComponentRegisterOption): (VueVNode | string)[] => {
  const tree = markdownToVDom(markdown)
  return vdomToVNode(createElement, [tree], components)
};

export default convert;
