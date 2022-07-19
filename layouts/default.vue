<script setup lang="ts"></script>

<template>
  <div class="scrollBar relative dark:bg-zinc-800">
    <GoTop />
    <BG />
    <TheHeader />
    <main>
      <slot />
    </main>
    <TheFooter />
  </div>
</template>

<style scoped>

</style>
