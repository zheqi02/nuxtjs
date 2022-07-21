import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@pinia/nuxt'
  ],
  content: {
    markdown: {
      toc: {
        depth: 3,
        searchDepth: 3
      }
    },
    highlight: {
      theme: 'dracula-soft'
    }
  },
  // plugins: [
  //   {
  //     src: '~/plugins/swiper.ts',
  //     ssr: false
  //   }
  // ],
  vueuse: {
    ssrHandlers: true
  },
  experimental: {
    reactivityTransform: true,
    viteNode: false
  },
  typescript: {
    shim: false
  },
  build: {
    analyze: true
  }
})
