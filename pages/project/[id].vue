<script setup lang="ts">
import { Icon } from '@iconify/vue'
const id = useRoute().params.id

const { data: item } = await useAsyncData('item-' + id, async () => {
  const q = await queryContent('project').only('body').findOne()
  return q.body.find((p: { id: number; }) => p.id == parseInt(id as string))
})

const time = (item.value.time as string).split('-').map(e => Number(e))
const formatData = () =>
  new Intl.DateTimeFormat('zh-CN').format(
    new Date(Date.UTC(time[0], time[1], time[2]))
  )

// Set header
useHead({
  title: `ZheQi ${item.value.title}`
})
</script>

<template>
  <div>
    <main>
      <section
        class="dark:bg-black dark:text-yellow-50 lg:px-[10%] pt-10 px-[5%] pb-16"
      >
        <div class="flex relative items-start flex-col lg:flex-row gap-7">
          <div class="flex-1">
            <img
              class="w-full object-contain h-[90%] dark:opacity-40"
              :src="item.image"
              :alt="item.title"
            />
          </div>
          <div class="flex-1">
            <p
              class="capitalize text-sm px-4 py-1 bg-gray-200 inline-block rounded text-gray-500"
            >
              {{ item.category }}
            </p>
            <h1 class="font-bold lg:text-3xl text-2xl my-5 lg:my-6">
              {{ item.title }}
            </h1>
            <div class="flex items-center space-x-1">
              <span>难度：</span>
              <div v-for="(r, i) in 5" :key="`itemRating-${i}`">
                <Icon
                  icon="ri:star-fill"
                  :class="{
                    'text-yellow-200': i < Math.round(item.rating.rate)
                  }"
                />
              </div>
            </div>
            <div class="text-lg">
              star: <span class="text-red-400">{{ item.rating.star }}</span>
            </div>
            <p class="lg:text-3xl text-2xl mt-8">
              {{ formatData() }}
            </p>
            <p
              class="mt-5 text-gray-500 whitespace-pre-wrap text-sm lg:text-base"
              v-html="item.description"
            ></p>
            <div class="mt-12 flex items-center space-x-5">
              <NuxtLink
                :href="item.github"
                class="dark:opacity-40 rainbow-bg text-white text-center py-4 rounded-md w-full"
              >
                To GitHub
              </NuxtLink>
              <button>
                <Icon icon="ph:heart-straight" class="text-gray-500 w-7 h-7" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style></style>
