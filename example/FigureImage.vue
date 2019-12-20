<template functional>
  <figure :class="[data.class, data.staticClass, $style.figure]">
    <img　:class="$style.image" :src="props.src" :alt="props.alt">
    <figcaption :class="$style.caption">{{ props.alt }}</figcaption>
  </figure>
</template>

<script>
export default {
  name: 'FigureImage',
  props: ['src', 'alt']
}
</script>

<style module>
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
