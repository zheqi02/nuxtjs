<script setup lang="ts">
import type { User } from '../types'

const { user } = defineProps<{
  user: User
}>()
</script>

<template>
  <div class="flex items-center border justify-around">
    <NuxtLink class="block text-center" href="https://github.com/zhe-qi">
      <img :src="user.avatar_url" alt="zhe-qi" class="w-[20vh] rounded-full" />
      <p class="dark:text-white">{{ user.name }}</p>
    </NuxtLink>
    <div class="prose lg:prose-xl dark:text-white">
      姓名：<span class="rainbow-text">折七</span>
      <br />
      年龄：快<span class="text-red-400">20</span>了
      <br />
      🌏<span class="text-red-600">China</span> 现居住于18线小城市 江西新余
      <br />
      🦄<span class="text-sky-300">带砖</span>大三还没开始，冶院在读✨
      <br />
      🥰冶院丁针，鉴定为<span class="text-sky-300">带砖</span>🍀
      <br />
      🌈喜欢<span class="text-emerald-400">主流前沿技术</span> ，喜欢游戏、小说、音乐🌠
      <br />
      🙈写这个网站的第<span class="text-orange-400">{{ 4 }}</span
      >天🌟（不连续）
    </div>
  </div>
</template>

<style></style>
