<template>
  <li class="li">
    <slot />
  </li>
</template>

<script>
export default {};
</script>

<style scoped>
.li {
  border-bottom: 1px solid gray;
}
.li:nth-child(n + 2) {
  margin-top: 8px;
}
</style>
