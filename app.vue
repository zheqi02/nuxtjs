<script setup lang="ts">
useHead({
  title: 'hello',
  link: [{ rel: 'icon', href: '/logo.png', type: 'image/png' }]
})

// const { show, close, isSupported } = useWebNotification({
//   title: 'Have a good time!',
//   dir: 'auto',
//   lang: 'en',
//   renotify: true,
//   tag: 'test'
// })

// if (isSupported) {
//   show()
//   if (process.client) {
//     setTimeout(() => {
//       close()
//     }, 3000)
//   }
// }
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
