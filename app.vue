<script setup lang="ts">
useHead({
  title: 'hello',
  link: [{ rel: 'icon', href: '/logo.png', type: 'image/png' }]
})
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
#app {
  @apply relative;
}
</style>
