<script setup lang="ts">
import { developADocument, isDark } from '#imports'
import { Icon } from '@iconify/vue'
// 使用标题
useHead({
  title: 'ZheQi Blog'
})

// 获取标题在content
const { data: blogNav } = await useAsyncData('navigation', () => {
  return fetchContentNavigation(queryContent('blog'))
})

// 触发玩具彩蛋
let isColor = $ref(false)
const changeSwitch = () => {
  isColor = !isColor
}
watch(
  () => isColor,
  () => {
    if (process.client) localStorage.setItem('isColor', JSON.stringify(isColor))
  }
)
onMounted(() => {
  if (process.client) isColor = JSON.parse(localStorage.getItem('isColor'))
})

// 来自composables的链接列表数据
let linkList = $ref(developADocument)

let bingValue = $ref('')
// 跳转必应搜索并清空输入框
const searchBing = () => {
  if (bingValue !== '' && process.client)
    window.open(`https://cn.bing.com/search?q=${encodeURIComponent(bingValue)}`)
  bingValue = ''
}
</script>

<template>
  <div class="pt-16">
    <!-- 语义化标签更有利于爬虫的抓取做seo优化 -->
    <main class="dark:bg-zinc-800 min-h-screen">
      <!-- titles -->
      <section class="lg:px-[15%] px-[5%] pt-10">
        <!-- title1 -->
        <h1
          class="dark:text-white lg:text-5xl text-2xl leading-normal font-semibold text-center"
        >
          <span
            :class="isColor && 'animate-text-pop-up-top'"
            class="text-zinc-600"
            >Check Out Our Latest Blog Posts
          </span>
          <label title="hello" class="swap swap-flip text-3xl ml-1">
            <!-- this hidden checkbox controls the state -->
            <input type="checkbox" @click="changeSwitch" />
            <div class="swap-on">😈</div>
            <div class="swap-off">😇</div>
          </label>
        </h1>
        <!-- title2 -->
        <h1
          class="lg:text-6xl text-4xl text-center leading-normal font-bold rainbow-text"
        >
          Learn. Share. Grow.
          <div class="rating gap-1">
            <input
              type="radio"
              name="rating-3"
              class="mask mask-heart bg-red-400"
            />
            <input
              type="radio"
              name="rating-3"
              class="mask mask-heart bg-orange-400"
              checked
            />
            <input
              type="radio"
              name="rating-3"
              class="mask mask-heart bg-yellow-400"
            />
            <input
              type="radio"
              name="rating-3"
              class="mask mask-heart bg-lime-400"
            />
            <input
              type="radio"
              name="rating-3"
              class="mask mask-heart bg-green-400"
            />
          </div>
        </h1>
      </section>
      <!-- links -->
      <section class="lg:px-[15%] px-[5%] lg:pt-20 pt-14">
        <!-- search -->
        <div class="flex justify-center items-center">
          <input
            v-model="bingValue"
            @keydown.enter="searchBing"
            type="text"
            placeholder="Click Here Search To Bing And Enter"
            class="input mb-2 input-ghost dark:focus:bg-zinc-700 w-full max-w-xs text-center font-medium tracking-wider text-gray-500"
          />
        </div>
        <!-- title -->
        <p
          class="flex items-center justify-center uppercase font-medium tracking-wider mb-10 text-gray-500"
        >
          Quick links
        </p>
        <!-- 链接 -->
        <div class="grid grid-cols-3 lg:grid-cols-10 gap-2">
          <div
            v-for="item in linkList"
            :key="item.text"
            class="flex items-center justify-center"
          >
            <Icon class="h-5 w-5 opacity-75" :icon="item.icon"></Icon>
            <a
              class="dark:text-white ml-1 link link-hover"
              :style="{
                color: isColor ? item.color : isDark ? '#fff' : '#898AA6'
              }"
              :href="item.href"
              >{{ item.text }}</a
            >
          </div>
        </div>
      </section>
      <!-- blogs -->
      <section class="lg:px-[15%] px-[5%] lg:pt-10 pt-14">
        <p
          class="flex items-center justify-center uppercase font-medium tracking-wider mb-10 text-gray-500"
        >
          blogs
        </p>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <template
            v-for="(b, i) in blogNav[0].children"
            :key="`blogNavItem-${b._path}-${i}`"
          >
            <div class="px-7 py-5 rounded-lg border border-zinc-300">
              <h2 class="text-lg font-semibold rainbow-text">
                {{ b.title }}
              </h2>
              <!-- 列表 -->
              <ul
                v-if="b.children"
                class="list-disc list-inside mt-4 pl-2 space-y-3"
              >
                <template
                  v-for="(child, k) in b.children"
                  :key="`childNav-${child._path}-${k}-${i}`"
                >
                  <li
                    class="list-item text-sm dark:text-white text-gray-600 hover:text-primary-900 underline underline-offset-4 decoration-wavy decoration-primary/40 hover:decoration-primary transition-all"
                  >
                    <NuxtLink :to="`/blog${child._path}`">
                      {{ child.title }}
                    </NuxtLink>
                  </li>
                </template>
              </ul>
              <ul v-else class="list-disc list-inside mt-4 pl-2 space-y-3">
                <li
                  class="list-item text-sm dark:text-white text-gray-600 hover:text-primary-900 underline underline-offset-4 decoration-wavy decoration-primary/40 hover:decoration-primary transition-all"
                >
                  <NuxtLink :to="`/blog${b._path}`"> Get Started </NuxtLink>
                </li>
              </ul>
            </div>
          </template>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped></style>
