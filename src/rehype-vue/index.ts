import { h } from 'vue-demi';
import sanitize from 'hast-util-sanitize';
import toH from 'hast-to-hyperscript';
import tableCellStyle from '@mapbox/hast-util-table-cell-style';

type CreateElement = typeof h
type ComponentRegisterFunc = (nodaData: any) => any;
export type ComponentRegisterOption = any


export type UserRemarkVueOption = {
  createElement: CreateElement;
  components?: ComponentRegisterOption;
  sanitizeScheme?: object;
  isVue3: boolean;
};
export type RemarkVueOption = Required<UserRemarkVueOption>;

const isFunc = (customComponent): customComponent is ComponentRegisterFunc => typeof customComponent === 'function';

export default function remarkVue(_options: UserRemarkVueOption) {
  this.Compiler = compile;

  const options: RemarkVueOption = {
    ..._options,
    components: _options?.components || {},
    sanitizeScheme: _options?.sanitizeScheme || null,
  };

  function hFactory(createElement: CreateElement) {
    return (name, nodeData, children) => {
      const compOrFunc = options.components[name];
      const custom = isFunc(compOrFunc) ? compOrFunc(nodeData) : compOrFunc;
      const component = custom || name;

      if (component === 'code') {
        console.log(component);
        console.log(nodeData);
        console.log(children);
        return createElement(component, "hoge");
      }

      return createElement(component, nodeData, children);
    };
  }

  function compile(node) {
    const hast = {
      type: 'root',
      properties: {},
      children: node.children,
    };
    const sanitized = options.sanitizeScheme ? sanitize(hast, options.sanitizeScheme) : hast;
    const cellStyled = tableCellStyle(sanitized);

    return toH(hFactory(options.createElement), cellStyled);
  }
}
