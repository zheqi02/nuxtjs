<script setup lang="ts">
import { isDark } from '#imports'

import { Icon } from '@iconify/vue'
const links = [
  {
    icon: 'carbon:blog',
    link: '/'
  },
  {
    icon: 'line-md:github-loop',
    link: 'https://github.com/zhe-qi',
    blank: '_blank'
  }
]

const handlerColorMode = () => (isDark.value = !isDark.value)
</script>

<template>
  <header
    class="dark:bg-black border-b-2 flex items-center justify-between h-20 px-[5%] lg:px-[15%]"
  >
    <NuxtLink to="/" class="font-bold text-2xl lg:text-4xl">
      <span class="rainbow-text">zhe-qi</span>
    </NuxtLink>
    <nav class="flex items-center space-x-7 text-gray-600">
      <template v-for="(n, _) in links" :key="`navLink-${i}`">
        <NuxtLink
          :to="n.link"
          :target="n.blank"
          class="inline-block nav-link hover:text-primary group"
        >
          <div class="flex items-center space-x-2">
            <Icon
              :icon="n.icon"
              class="w-5 h-5 text-primary-500 hover:text-primary"
            />
          </div>
          <div
            class="h-0.5 w-4/5 bg-primary mt-1 -translate-y-full scale-0 group-hover:scale-100 group-hover:translate-y-full transition-all"
          ></div>
        </NuxtLink>
      </template>
      <div class="inline-block cursor-pointer hover:text-primary group">
        <div class="flex items-center space-x-2">
          <Icon
            @click="handlerColorMode"
            :icon="
              isDark ? 'ph:moon-stars' : 'material-symbols:wb-sunny-outline'
            "
            class="w-5 h-5 swap-on fill-current text-primary-500 hover:text-primary"
          />
        </div>
        <div
          class="h-0.5 w-4/5 bg-primary mt-1 -translate-y-full scale-0 group-hover:scale-100 group-hover:translate-y-full transition-all"
        ></div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.nav-link.router-link-active.router-link-exact-active {
  @apply text-primary;
}
</style>
