<script setup lang="ts">
</script>

<template>
  <div class="scrollBar overflow-x-hidden relative dark:bg-zinc-800">
    <GoTop />
    <BG />
    <TheHeader />
    <main>
      <slot />
    </main>
  </div>
</template>

<style scoped></style>
