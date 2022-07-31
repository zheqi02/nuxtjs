<script setup lang="ts">
useHead({
  link: [{ rel: 'icon', href: '/favicon.ico', type: 'image/icon' }]
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
#app {
  @apply relative;
}
/* 整个滚动条 */
::-webkit-scrollbar {
  @apply w-2 h-2;
}

/* 滚动条上的滚动滑块 */
::-webkit-scrollbar-thumb {
  @apply bg-zinc-400;
  border-radius: 32px;
}

/* 滚动条轨道 */
::-webkit-scrollbar-track {
  @apply bg-zinc-200;
  border-radius: 32px;
}
</style>
