# markduck

Render markdown with your Vue components.

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
import Markduck from 'markduckjs'

import UnorderedList from '/your/custom/components/UnorderedList'
import ListItem from '/your/custom/components/ListItem'
import FigureImage from '/your/custom/components/FigureImage'

export default {
  components: {
    markduck: (() => {
      return Markduck({
        ul: UnorderedList, // register your components!
        li: ListItem,
        img: FigureImage,
      })
    })()
  },
  computed: {
    markdown() {
      return `
# title

plain text plain text plain text plain text plain text.

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
  }
}
```
