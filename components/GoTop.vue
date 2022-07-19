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
  if (process.client) {
    // 回到顶部并过渡
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
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
