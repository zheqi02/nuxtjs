<script setup lang="ts">
const fps = useFps()
</script>

<template>
  <div class="h-[2px] bg-sky-100"></div>
  <div
    class="flex items-center justify-center dark:bg-zinc-800 h-10 rounded-bl-lg rounded-br-lg"
  >
    <div class="dark:text-white lg:text-base text-sm">
      @2022 -内容仅供参考，网站仅供学习 --FPS:
      <span class="text-emerald-300">{{ fps }}</span>
    </div>
  </div>
</template>

<style scoped></style>