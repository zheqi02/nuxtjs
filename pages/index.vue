<script setup lang="ts">
import { developADocument } from '#imports'
import { Icon } from '@iconify/vue'
const { data: blogNav } = await useAsyncData('navigation', () => {
  return fetchContentNavigation(queryContent('blog'))
})

useHead({
  title: 'Content Blog'
})

let isHello = $ref(false)
const linkList = ref(developADocument)
</script>

<template>
  <div class="dark:bg-black min-h-screen">
    <main>
      <section class="lg:px-[15%] px-[5%] pt-20">
        <h1
          class="dark:text-white lg:text-5xl text-2xl leading-normal font-semibold text-center"
        >
          <span :class="isHello && 'animate-text-pop-up-top'"
            >Check Out Our Latest Blog Posts</span
          >
          <label title="hello" class="swap swap-flip text-3xl ml-1">
            <!-- this hidden checkbox controls the state -->
            <input type="checkbox" @click="isHello = !isHello" />
            <div class="swap-on">😈</div>
            <div class="swap-off">😇</div>
          </label>
        </h1>
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
      <section class="lg:px-[15%] px-[5%] lg:pt-20 pt-14">
        <p
          class="text-center uppercase font-medium tracking-wider mb-10 text-gray-500"
        >
          Blog Posts
        </p>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <template
            v-for="(b, i) in blogNav[0].children"
            :key="`blogNavItem-${b._path}-${i}`"
          >
            <div class="px-7 py-5 rounded-lg border-2 border-emerald-100">
              <h2 class="text-lg font-semibold rainbow-text">
                {{ b.title }}
              </h2>
              <!-- Loop over files inside the content dir -->
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
      <section class="lg:px-[15%] px-[5%] lg:pt-20 pt-14">
        <p
          class="text-center uppercase font-medium tracking-wider mb-10 text-gray-500"
        >
          Quick Navigation
        </p>
        <div class="grid grid-cols-3 lg:grid-cols-10 gap-2">
          <div
            v-for="item in linkList"
            :key="item.text"
            class="flex items-center"
          >
            <Icon class="text-lg" :icon="item.icon"></Icon>
            <a class="ml-1 link link-hover" :href="item.href">{{
              item.text
            }}</a>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped></style>
