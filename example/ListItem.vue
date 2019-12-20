<template>
  <li class="li"><slot/></li>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.li{
  border-bottom: 1px solid gray;

  &:nth-child(n + 2) {
    margin-top: 8px;
  }
}
</style>
