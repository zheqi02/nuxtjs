<script setup lang="ts">
const { y } = useWindowScroll()

let top = $ref('-999px')

watch(y, () => {
  if (y.value > 100) {
    top = '-200px'
  } else {
    top = '-999px'
  }
})

const changeTop = () => {
  if (process.client) window.scrollTo(0, 0)
}
</script>

<template>
  <div
    class="back-to-top cd-top faa-float animated cd-is-visible transition-all"
    @click="changeTop"
  ></div>
</template>

<style scoped>
@import '~/assets/css/szgotop.css';
.back-to-top {
  top: v-bind(top);
}
</style>
