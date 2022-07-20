<script setup lang="ts">
import { isDark } from '#imports'
const url = 'https://zheqi.club/Pio/static/'

useHead({
  link: [
    { rel: 'icon', href: '/logo.png', type: 'image/png' },
    {
      rel: 'stylesheet',
      href: url + 'pio.css'
    }
  ],
  script: [{ src: url + 'l2d.js' }, { src: url + 'pio.js' }]
})

onMounted(() => {
  if (process.client) {
    const arr = Array.from(new Array(87), (_, i) => i + 1)
    new Paul_Pio({
      mode: 'draggable',
      hidden: true,
      content: {
        link: 'https://nuxtjs-zhe-qi.vercel.app/home/Myself',
        welcome: [
          '欢迎来到折七的小宇宙！',
          '今天天气不错，一起来玩吧！',
          '博主每天都有些折腾记录，欢迎前往他的小窝阅读~'
        ],
        custom: [
          {
            selector: '.comment-form',
            text: '欢迎参与本文评论，别发小广告噢~'
          },
          {
            selector: '.home-social a:last-child',
            text: '在这里可以了解博主的日常噢~'
          },
          { selector: '.post-item a', type: 'read' },
          { selector: '.post-content a, .page-content a', type: 'link' }
        ]
      },
      night: () => {
        isDark.value = !isDark.value
      },
      model: [
        `https://zheqi.club/Pio/models/pio/${
          arr[Math.floor(Math.random() * arr.length)]
        }.json`
      ]
    })
  }
})

// 拖动时鼠标的样式
const pio = $ref<HTMLElement | null>(null)
onMounted(() => {
  if (process.client) {
    watchEffect(() => {
      pio?.addEventListener('mousedown', () => {
        pio.style.cursor = 'grabbing'
      })
      pio?.addEventListener('drag', () => {
        pio.style.cursor = 'grabbing'
      })
      pio?.addEventListener('mouseup', () => {
        pio.style.cursor = 'grab'
        if (pio.offsetLeft < 100 && pio.offsetTop > 700) {
          pio.style.left = '0'
          pio.style.top = '830px'
        }
      })
    })
  }
})
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
      <div ref="pio" class="pio-container cursor-grab left">
        <div class="pio-action"></div>
        <canvas id="pio" width="222" height="210"></canvas>
      </div>
    </NuxtLayout>
  </div>
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
