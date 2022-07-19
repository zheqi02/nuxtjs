<script setup lang="ts">
import { isDark } from '#imports'
useHead({
  link: [
    { rel: 'icon', href: '/logo.png', type: 'image/png' },
    {
      rel: 'stylesheet',
      href: '/Pio/static/pio.css'
    }
  ],
  script: [
    // {
    //   src: '/live2dw/lib/L2Dwidget.min.js'
    // }
    {
      src: '/Pio/static/pio.js'
    },
    {
      src: '/Pio/static/l2d.js'
    }
  ]
})

const { width } = useWindowSize()

if (width.value > 768) {
  const resu = <T>(arr: T[]): T => {
    return arr[Math.floor(Math.random() * arr.length)]
  }

  const board: number[] = Array.from(new Array(88), (_, i) => i + 1)

  onMounted(() => {
    if (process.client) {
      // const res = resu<number>(board)
      // ;(window as any).L2Dwidget.on('*', (name: any) => {}).init({
      //   pluginRootPath: '/live2dw/',
      //   pluginJsPath: 'lib/',
      //   //中间这个haru_2更换为你的模型名称
      //   pluginModelPath: 'live2d-widget-model-Pio/assets/',
      //   model: {
      //     jsonPath: `/live2dw/live2d-widget-model-Pio/assets/${res}.json`
      //   },
      //   //调整大小,和位置
      //   display: { position: 'left', width: 300, height: 400 },
      //   mobile: { show: true, scale: 0.9 },
      //   dialog: {
      //     enable: true,
      //     script: {
      //       //每20s，显示一言（调用一言Api返回的句子）
      //       'every idle 20s': '$hitokoto$',
      //       //触摸到class='star'对象
      //       'hover .star': '星星在天上而你在我心里 (*/ω＼*)',
      //       //触摸到身体
      //       'tap body': '害羞⁄(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄',
      //       //触摸到头部
      //       'tap face': '~~'
      //     }
      //   }
      // })
      let res = resu<number>(board)
      new Paul_Pio({
        mode: 'fixed',
        hidden: true,
        content: {
          link: 'https://nuxtjs-rose-nine.vercel.app/home/Myself',
          welcome: [
            '欢迎来到保罗的小宇宙！',
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
        model: [`/Pio/models/pio/${res}.json`]
      })
    }
  })
}
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
      <div class="pio-container left">
        <div class="pio-action"></div>
        <canvas id="pio" width="277" height="300"></canvas>
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
