<script setup lang="ts">
const fps = useFps()
</script>

<template>
  <div>
    <div class="divider"></div>
    <div
      class="flex items-center justify-center dark:bg-zinc-900 h-10 rounded-bl-lg rounded-br-lg"
    >
      <div class="dark:text-white">
        @2022 -仅学习使用，不做任何商业目的 --FPS: <span class=" text-emerald-300">{{ fps }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
