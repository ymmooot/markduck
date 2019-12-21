<div align="center">
  <img src="./assets/logo.png" alt="logo" title="logo" width="100px">
</div>

# markduck

[![version](https://img.shields.io/npm/v/markduckjs.svg)](https://www.npmjs.com/package/markduckjs)
[![dependencies](https://david-dm.org/ymmooot/markduckjs/status.svg)](https://david-dm.org/ymmooot/markduckjs)
[![codecov](https://codecov.io/gh/ymmooot/markduck/branch/master/graph/badge.svg)](https://codecov.io/gh/ymmooot/markduck)
[![prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=shield)](https://github.com/prettier/prettier)
[![typescript](https://camo.githubusercontent.com/832d01092b0e822178475741271b049a2e27df13/68747470733a2f2f62616467656e2e6e65742f62616467652f2d2f547970655363726970742f626c75653f69636f6e3d74797065736372697074266c6162656c)](https://www.typescriptlang.org/docs/home.html)

Render markdown with your [Vue](https://github.com/vuejs/vue) components.

## Installation

```
$ npm install markduckjs
or
$ yarn add markduckjs
```

## Usage

```vue
<template>
  <markduck :markdown="markdown"/>
</template>

<script>
import UnorderedList from '/your/custom/components/UnorderedList.vue';
import ListItem from '/your/custom/components/ListItem.vue';
import FigureImage from '/your/custom/components/FigureImage.vue';

import gemojiToEmoji from 'remark-gemoji-to-emoji';

export default {
  data() {
    return {
      markdown: '# your markdown'
    };
  },
  components: {
    markduck: (() => {
      return Markduck({
        remarkPlugins: [gemojiToEmoji],
        components: {
          ul: UnorderedList, // register your components!
          li: ListItem,
          img: (vdom, parent) => { // you can register it via function
            if (vdom.properties.attributes.alt) {
              return FigureImage;
            }
            return undefined;
          },
        },
      });
    })(),
  },
};
```

## Options

### components

Register Vue components corresponding to each HTML element.

#### type

`Object`

```ts
type ComponentRegisterFunc = (node: VNode, parentNode?: VNode) => VueConstructor<Vue> | undefined;

type ComponentRegisterOption = {
  [keyof: string]: VueConstructor<Vue> | ComponentRegisterFunc;
};
```

#### default

`{}`

### remarkPlugins

[Remark](https://github.com/remarkjs/remark) plugins.  
A part of lists is here 👉 [github.com/remarkjs/remark/blob/master/doc/plugins.md#list-of-plugins](https://github.com/remarkjs/remark/blob/d1d4fe6bf4fb7888e4b5423444fa266a424bdbac/doc/plugins.md#list-of-plugins)

#### type

`Array` of `Plugin` or `{ plugin: Plugin, config: Settings }`  
(`Plugin` and `Settings` are from [Unified](https://github.com/unifiedjs/unified).)

#### default

`[]`

## Demo

Clone and run:

```bash
npm run demo
```
