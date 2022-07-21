<script setup lang="ts">
import { WebGL } from '#imports'

const canvas = ref<HTMLElement | null>(null)

onMounted(() => {
  if (process.client) WebGL(canvas.value)
})
</script>

<template>
  <div ref="canvas" class="h-full w-full"></div>
</template>

<style scoped></style>
