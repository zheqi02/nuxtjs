<script setup lang="ts">
const { $modules } = useNuxtApp()
interface Imgs {
  url: string
  title: string
}
const imgs: Imgs[] = [
  // {
  //   url: 'https://api.qicaiyun.top/ercy/api.php',
  //   title: '第一张'
  // },
  {
    // https://api.ghser.com/random/pc.php
    url: 'https://tva1.sinaimg.cn/large/0072Vf1pgy1foxk44i0ekj31hc0u0drp.jpg',
    title: '第二张'
  },
  {
    // http://api.btstu.cn/sjbz/?lx=dongman
    url: 'https://tva1.sinaimg.cn/large/006gkh44ly1fw6ssoq7z0j31kw0w01jn.jpg',
    title: '第三张'
  },
  {
    url: 'https://tva1.sinaimg.cn/large/9bd9b167gy1g4c8qk3d33j21hc0u0nnj.jpg',
    title: '第四张'
  },
  {
    // https://api.ixiaowai.cn/api/api.php
    // https://api.btstu.cn/sjbz/?lx=suiji
    url: 'https://tva1.sinaimg.cn/large/0072Vf1pgy1foxki8yafwj31kw0w04oy.jpg',
    title: '第五张'
  },
  {
    url: 'https://img.paulzzh.com/touhou/random',
    title: '第六张'
  },
  {
    url: 'https://img.xjh.me/random_img.php?return=302',
    title: '第七张'
  },
  {
    url: 'http://api.btstu.cn/sjbz/?lx=dongman',
    title: '第八张'
  },
  {
    url: 'https://www.dmoe.cc/random.php',
    title: '第九张'
  }
]
</script>

<template>
  <swiper
    class="w-full h-full cursor-col-resize"
    :modules="$modules"
    :loop="true"
    :scrollbar="{ draggable: true }"
    :autoplay="{
      delay: 4000,
      disableOnInteraction: false
    }"
  >
    <template v-for="item in imgs" :key="item.title">
      <swiper-slide class="w-full h-full dark:brightness-75">
        <img
          class="object-cover w-full h-full"
          :src="item.url"
          :alt="item.title"
        />
      </swiper-slide>
    </template>
  </swiper>
</template>

<style scoped></style>
