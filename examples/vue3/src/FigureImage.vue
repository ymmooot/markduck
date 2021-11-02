<template>
  <figure class="figure">
    <img class="image" :src="src" :alt="alt" />
    <figcaption class="caption">{{ alt }}</figcaption>
  </figure>
</template>

<script>
export default {
  name: 'FigureImage',
  props: ['src', 'alt'],
};
</script>

<style scoped>
.figure {
  display: inline-block;
  padding: 12px;
  border: 1px solid gray;
}

.image {
  max-width: 400px;
}

.caption {
  font-family: 'Courier New';
  margin-top: 4px;
}
</style>
