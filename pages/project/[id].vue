<script setup lang="ts">
import { Icon } from '@iconify/vue'
const id = useRoute().params.id

const { data: item } = await useAsyncData('item-' + id, async () => {
  const q = await queryContent('project').only('body').findOne()
  return q.body.find((p: { id: number }) => p.id == parseInt(id as string))
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
    <main
      class="dark:bg-black pt-16 dark:text-yellow-50 h-[100vh] overflow-hidden"
    >
      <section class="lg:px-[10%] pt-10 px-[5%] pb-16">
        <div class="flex relative items-start flex-col lg:flex-row lg:gap-7">
          <div class="flex-1">
            <img
              class="object-cover h-[20vh] lg:h-[70vh] dark:brightness-50"
              :src="item.image"
              :alt="item.title"
            />
          </div>
          <div class="flex-1">
            <p
              class="capitalize dark:bg-zinc-600 dark:text-yellow-100 text-sm px-4 hidden py-1 bg-gray-200 lg:inline-block rounded text-gray-500"
            >
              {{ item.category }}
            </p>
            <h1 class="font-bold lg:text-3xl text-xl my-5 lg:my-6">
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
            <div class="lg:text-lg text-sm">
              star: <span class="text-red-400">{{ item.rating.star }}</span>
            </div>
            <p class="lg:text-3xl text-sm lg:mt-8 mt-2">
              {{ formatData() }}
            </p>
            <p
              class="mt-5 text-gray-500 whitespace-pre-wrap text-xs lg:text-base"
              v-html="item.description"
            ></p>
            <div class="lg:mt-12 mt-2 flex items-center space-x-5">
              <NuxtLink
                :to="item.github"
                class="dark:brightness-50 rainbow-bg text-white text-center py-4 rounded-md w-full"
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

<style scoped></style>