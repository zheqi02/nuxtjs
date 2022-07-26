<script setup lang="ts">
import { Icon } from '@iconify/vue'
const links = [
  {
    icon: 'carbon:blog',
    link: '/home',
    text: 'Home'
  },
  {
    icon: 'ph:list-bullets-bold',
    link: '/project',
    text: 'Project'
  },
  {
    icon: 'line-md:github-loop',
    link: 'https://github.com/zhe-qi',
    blank: '_blank',
    text: 'Github'
  }
]
const { isDark } = await import('#imports')
const handlerColorMode = () => (isDark.value = !isDark.value)

const target = ref<HTMLElement | null>(null)
useFocus(target, { initialValue: true })

let value = $ref<string>('')

interface ResultData {
  path: string
  text: string
}

let isSearch = $ref(true)

const closeSearch = () => {
  setTimeout(() => {
    isSearch = true
  }, 300)
}

const getSearchData = async () => {
  const blog = await queryContent('blog')
    .where({
      tags: { $contains: value }
    })
    .find()

  const result: ResultData[] = []
  for (let i = 0, len = blog.length; i < len; i++) {
    const path = blog[i]?._path,
      text = blog[i]?.title

    result.push({
      path,
      text
    })
  }
  return result
}

let searchList = $ref<ResultData[]>([])
watch(
  () => value,
  async () => {
    if (value.length < 1) {
      searchList = []
      return
    }
    searchList = await getSearchData()
  },
  { immediate: true }
)

const searchStart = async () => {
  if (value === '') return
}

const filteredList = computed(() => {
  const arr: ResultData[] = []
  searchList.forEach(item => {
    arr.push({
      path: `/blog${item.path}`,
      text: item.text
    })
  })
  return arr
})

const { list, containerProps, wrapperProps } = useVirtualList(filteredList, {
  itemHeight: 22
})
</script>

<template>
  <header
    class="fixed z-10 backdrop-blur-md w-screen dark:border-zinc-600 border-b-2 flex items-center justify-between h-16 px-[5%] lg:px-[15%]"
  >
    <NuxtLink to="/" title="回到初始页" class="font-bold text-2xl lg:text-4xl">
      <div class="rainbow-text">zhe-qi</div>
    </NuxtLink>
    <nav class="flex items-center space-x-7 text-gray-600">
      <!-- list -->
      <template v-for="(n, i) in links" :key="`navLink-${i}`">
        <NuxtLink
          v-show="isSearch"
          :to="n.link"
          :title="n.text"
          :target="n.blank"
          class="inline-block nav-link hover:text-primary group"
        >
          <div class="flex items-center space-x-2">
            <Icon
              :icon="n.icon"
              class="w-5 h-5 text-primary-500 hover:text-primary"
            />
          </div>
          <div
            class="h-0.5 w-4/5 bg-primary mt-1 -translate-y-full scale-0 group-hover:scale-100 group-hover:translate-y-full transition-all"
          ></div>
        </NuxtLink>
      </template>
      <!-- switch -->
      <div
        v-show="isSearch"
        title="ColorMode"
        class="inline-block cursor-pointer hover:text-primary group"
      >
        <div class="flex items-center space-x-2">
          <Icon
            @click="handlerColorMode"
            :icon="
              isDark ? 'ph:moon-stars' : 'material-symbols:wb-sunny-outline'
            "
            class="w-5 h-5 swap-on fill-current text-primary-500 hover:text-primary"
          />
        </div>
        <div
          class="h-0.5 w-4/5 bg-primary mt-1 -translate-y-full scale-0 group-hover:scale-100 group-hover:translate-y-full transition-all"
        ></div>
      </div>
      <div class="inline-block cursor-pointer hover:text-primary group">
        <div class="flex items-center space-x-2">
          <Icon
            v-if="isSearch"
            @click="isSearch = false"
            icon="line-md:search"
            class="w-5 h-5 swap-on fill-current text-primary-500 hover:text-primary"
          />
          <input
            v-else
            v-model="value"
            ref="target"
            @keydown.enter="searchStart"
            @focusout="closeSearch"
            type="text"
            placeholder="press enter"
            class="dark:bg-slate-700 dark:text-white input input-bordered input-info w-full max-w-xs"
          />
        </div>
        <!-- 搜索列表 TODO -->
        <div v-if="!isSearch" class="relative mt-1 w-full">
          <div
            v-bind="(containerProps as any)"
            class="h-60 w-full absolute z-10"
          >
            <div v-bind="wrapperProps">
              <NuxtLink
                v-for="item in list"
                :key="item.index"
                class="dark:bg-slate-200 dark:hover:bg-slate-600 block h-6 mt-[1px] w-full border truncate hover:text-pink-400 hover:bg-sky-100"
                :href="item.data.path"
              >
                {{ item.data.text }}
              </NuxtLink>
            </div>
          </div>
        </div>
        <div
          class="h-0.5 w-4/5 bg-primary mt-1 -translate-y-full scale-0 group-hover:scale-100 group-hover:translate-y-full transition-all"
        ></div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.nav-link.router-link-active.router-link-exact-active {
  @apply text-primary;
}
</style>
