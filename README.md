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
import Markduck from 'markduckjs';

import UnorderedList from '/your/custom/components/UnorderedList.vue';
import ListItem from '/your/custom/components/ListItem.vue';
import FigureImage from '/your/custom/components/FigureImage.vue';

import { emojify } from 'node-emoji';

export default {
  components: {
    markduck: (() => {
      return Markduck({
        textFilter(text) {
          return emojify(text);
        },
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
  computed: {
    markdown() {
      return `
# title

plain text plain text plain text plain text plain text.

text emoji filter :duck:

## sub titles

| left | right |
| --- | --- |
| ![Reflected　Fuji](https://pbs.twimg.com/media/DxW9ZfOUcAAJOQk?format=jpg) | text |
| [link　example](https://example.com) | **bold text** |

- Animatrix
- Blade Runner
- Cowboy Bepob
- Dragon Ball
- Evangelion
- Ghost in the Shell
- Hunter X Hunter
- Initial D
- JoJo's Bizarre Adventure
- [Kill la Kill](https://en.wikipedia.org/wiki/Kill_la_Kill)

`
    },
  },
};
```

## Demo

Clone and run:

```bash
npm run demo
```
