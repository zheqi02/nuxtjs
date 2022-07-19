<script setup lang="ts">
import { isDark } from '#imports'
console.log(`
  く__,.ヘヽ.        /  ,ー､ 〉
           ＼ ', !-─‐-i  /  /´
           ／｀ｰ'       L/／｀ヽ､
         /   ／,   /|   ,   ,       ',
       ｲ   / /-‐/  ｉ  L_ ﾊ ヽ!   i
        ﾚ ﾍ 7ｲ｀ﾄ   ﾚ'ｧ-ﾄ､!ハ|   |
          !,/7 '0'     ´0iソ|    |
          |.从"    _     ,,,, / |./    |
          ﾚ'| i＞.､,,__  _,.イ /   .i   |
            ﾚ'| | / k_７_/ﾚ'ヽ,  ﾊ.  |
              | |/i 〈|/   i  ,.ﾍ |  i  |
             .|/ /  ｉ：    ﾍ!    ＼  |
              kヽ>､ﾊ    _,.ﾍ､    /､!
              !'〈//｀Ｔ´', ＼ ｀'7'ｰr'
              ﾚ'ヽL__|___i,___,ンﾚ|ノ
                  ﾄ-,/  |___./
                  'ｰ'    !_,.:
live2d、Pio、live2d-wiget
`)
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

const { width } = useWindowSize()
if (width.value > 768) {
  onMounted(() => {
    nextTick(() => {
      if (process.client) {
        const arr = Array.from(new Array(87), (_, i) => i + 1)
        const random = arr[Math.floor(Math.random() * arr.length)]
        new Paul_Pio({
          mode: 'fixed',
          hidden: true,
          content: {
            link: 'https://nuxtjs-fmp6xrzu4-zhe-qi.vercel.app/home/Myself',
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
          model: [`https://zheqi.club/Pio/models/pio/${random}.json`]
        })
      }
    })
  })
}
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
      <div class="pio-container left">
        <div class="pio-action"></div>
        <canvas id="pio" width="277" height="260"></canvas>
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
