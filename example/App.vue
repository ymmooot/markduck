<template>
  <markduck :markdown="markdown"/>
</template>

<script>
import Markduck from '../src/index.ts'
import FigureImage from './FigureImage.vue'
import ListItem from './ListItem.vue'
import UnorderedList from './UnorderedList.vue'

export default {
  name: 'App',
  components: {
    markduck: (() => {
      return Markduck({
        ul: UnorderedList,
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
| :--- | ---: |
| ![Reflected　Fuji](https://pbs.twimg.com/media/DxW9ZfOUcAAJOQk?format=jpg) | plain text |
| [link](https://google.com) | **bold text** |

- Animatrix
- Blade Runner
- Cowboy Bepob
- Dragon Ball
- Evangelion
- Ghost in the Shell
- Hunter X Hunter
- Initial D
- JoJo's Bizarre Adventure
- Kill la Kill

`
    },
  }
}
</script>
