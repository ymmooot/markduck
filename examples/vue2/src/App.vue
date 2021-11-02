<template>
  <div class="app">
    <div class="column">
      <textarea class="textarea" v-model="markdown"></textarea>
    </div>
    <div class="column">
      <markduck :markdown="markdown" />
    </div>
  </div>
</template>

<script>
import gemojiToEmoji from 'remark-gemoji-to-emoji';
import rehypePrism from '@mapbox/rehype-prism';
import 'prismjs/themes/prism.css';

import markduck from 'markduckjs';
import FigureImage from './FigureImage.vue';
import ListItem from './ListItem.vue';
import UnorderedList from './UnorderedList.vue';

export default {
  name: 'App',
  components: {
    markduck: markduck({
      remarkPlugins: [gemojiToEmoji],
      rehypePlugins: [rehypePrism],
      components: {
        ul: UnorderedList,
        li: ListItem,
        img(nodeData) {
          if (nodeData.attrs.alt) {
            return FigureImage;
          }
          return undefined;
        },
      },
    }),
  },
  data() {
    return {
      markdown: `
# title

plain text plain text plain text plain text plain text.

emoji code (\`:duck:\`) will be → :duck: by adding \`remark-gemoji-to-emoji\`

\`\`\`ts
class Duck {
  quack() {
    return 'quack!'
  }
}
\`\`\`

## sub titles

| left | right |
| :---- | ----: |
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
- [Kill la Kill](https://en.wikipedia.org/wiki/Kill_la_Kill)

`,
    };
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>

<style lang="scss" scoped>
.app {
  display: flex;
  justify-content: stretch;
}

.textarea {
  width: 100%;
  height: 100%;
  resize: none;
}

.column {
  width: 100%;
  padding: 20px;
  &:nth-child(1) {
    border-right: 1px solid gray;
  }
}
</style>
