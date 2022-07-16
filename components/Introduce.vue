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
      name: <span class="rainbow-text">折七</span>
      <br />
      age: <span class="text-red-400">20</span>没到
      <br />
      🌈学了差不多1400个小时的前端半年左右✨
      <br />
      🌏<span class="text-red-600">China</span> 现居住于18线小城市 江西新余
      <br />
      🦄<span class="text-sky-300">带砖</span>大三还没开始，冶院在读✨
      <br />
      🥰冶院丁针，鉴定为<span class="text-sky-300">带砖</span>!🍀
      <br />
      🌈喜欢<span class="text-emerald-400">主流前沿技术</span>
      ，喜欢游戏、小说、音乐🌠
      <br />
      🙈写这个网站的第<span class="text-orange-400">{{ 4 }}</span
      >天🌟(不连续)
      <br />
      🌠左边是从github拉取的资料，点击可以跳转😶‍🌫️
    </div>
  </div>
</template>

<style></style>
