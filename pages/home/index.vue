<script setup lang="ts">
import { Icon } from '@iconify/vue'
useHead({
  title: 'ZheQi Home'
})

const { data: user } = await useFetch('/api/user')

let isFilter = $ref(false)

const showFilter = () => {
  isFilter = !isFilter
}
// https://www.dmoe.cc/random.php
// https://img.xjh.me/random_img.php
// https://api.ghser.com/random/api.php

const rdmImg = [
  'https://tva1.sinaimg.cn/large/0072Vf1pgy1foxkj2ashuj31kw0w0hcp.jpg',
  'https://tva1.sinaimg.cn/large/9bd9b167gy1g4li9pcge2j21hc0xcb29.jpg',
  'https://tva3.sinaimg.cn/large/0072Vf1pgy1foxkihz4b4j31hc0u0wux.jpg',
  'https://tva1.sinaimg.cn/large/006gkh44ly1fw72u8rmohj31hc0u0tyb.jpg',
  'https://tva3.sinaimg.cn/large/0072Vf1pgy1foxk3gtfinj31hc0u0k6t.jpg',
  'https://tva2.sinaimg.cn/large/0072Vf1pgy1foxkfob8yfj31hc0u0ts9.jpg',
  'https://ae01.alicdn.com/kf/HTB10cz_XBGw3KVjSZFD760WEpXas.png',
  'https://tva1.sinaimg.cn/large/0076R7yAgy1fq8ds6c448j31hc0u016f.jpg',
  'https://tva1.sinaimg.cn/large/006gkh44ly1fw6sscydcwj31hc0u0h4r.jpg',
  'https://ae01.alicdn.com/kf/Ha32ccf3a64c240869ee3604e80c5d023i.jpg',
  'https://tva1.sinaimg.cn/large/9bd9b167ly1g2qmjashi6j21hc0u0u0x.jpg',
  'https://tva1.sinaimg.cn/large/0072Vf1pgy1fodqpadh6zj31kw14nnpe.jpg'
]

interface ArticleData {
  _path: string
  title: string
  children?: ArticleData[]
  img?: string
}

// 获取所有文章导航
const articleData: ArticleData[] = $ref([])
const { data: blogNav } = await useAsyncData('navigation', () => {
  return fetchContentNavigation(queryContent('blog'))
})
const nav = toRaw(blogNav.value) as Array<ArticleData>
// 递归把所有叶子节点放入数组articleData
const recursion = (data: ArticleData[]) => {
  data.forEach(item => {
    if (item.children) {
      recursion(item.children)
    } else {
      articleData.push(
        Object.assign(
          { img: rdmImg[Math.floor(Math.random() * rdmImg.length)] },
          item
        )
      )
    }
  })
}
recursion(nav)

let search = $ref('')
let indexV = $ref(0)

// 使用虚拟列表
// 不区分大小写过滤
const filteredList = computed(() =>
  articleData.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase())
  )
)
const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(
  filteredList,
  {
    itemHeight: 22
  }
)
const handleScrollTo = () => {
  if (indexV >= 0) scrollTo(indexV)
}

interface Util {
  url: string
  img: string
  title: string
  text: string
  id: number | string
}

const utils: Util[] = [
  {
    id: '1',
    url: 'https://vuetelescope.com/',
    img: 'https://tva3.sinaimg.cn/large/0072Vf1pgy1fodqo0e8fzj31hc0xcqv5.jpg',
    title: 'Vuetelescope',
    text: '这是一个可以查看你vue技术栈的浏览器插件'
  },
  {
    id: '2',
    url: 'https://picsum.photos/',
    img: 'https://tva1.sinaimg.cn/large/0072Vf1pgy1foxlnf6ksdj31kw0w0dzb.jpg',
    title: 'Picsum',
    text: '这是一个随机图片API生成工具'
  },
  {
    id: '3',
    url: 'https://tail-animista.vercel.app/play/basic/scale-up/scale-up-center',
    img: 'https://api.ixiaowai.cn/api/api.php',
    title: 'Tailanimista',
    text: '这是一个Tailwindcss的动画生成工具'
  }
]
</script>

<template>
  <div class="lg:px-[15%] px-[5%] w-screen">
    <main class="pt-[4.5rem] w-full">
      <!-- 头上三个大板块 -->
      <div
        class="grid bg-zinc-50 dark:bg-black lg:grid-cols-3 grid-cols-1 lg:grid-rows-1 grid-rows-3 lg:gap-4 lg:h-64 w-full"
      >
        <div
          class="bg-white dark:contrast-50 dark:bg-black grid rounded overflow-hidden grid-cols-2 grid-rows-2 gap-4"
        >
          <div class="overflow-hidden rounded cursor-pointer">
            <img
              class="object-cover border hover:scale-150 transition-all"
              src="https://tva2.sinaimg.cn/large/87c01ec7gy1frx3t6m651j21hc0u07cj.jpg"
              alt=""
            />
          </div>
          <div class="overflow-hidden rounded cursor-pointer">
            <img
              class="object-cover border hover:scale-150 transition-all"
              src="https://tva4.sinaimg.cn/large/0072Vf1pgy1foxkfsdn3mj31hc0u0nhh.jpg"
              alt=""
            />
          </div>
          <div class="overflow-hidden rounded cursor-pointer">
            <img
              class="object-cover border hover:scale-150 transition-all"
              src="https://tva4.sinaimg.cn/large/0072Vf1pgy1foxkj1cgi7j31hc0u0n9m.jpg"
              alt=""
            />
          </div>
          <div class="overflow-hidden rounded cursor-pointer">
            <img
              class="object-cover border hover:scale-150 transition-all"
              src="https://tva1.sinaimg.cn/large/0072Vf1pgy1foxk7272z8j31kw0w0h0a.jpg"
              alt=""
            />
          </div>
        </div>
        <div
          class="bg-white dark:bg-black overflow-hidden rounded lg:h-full w-full h-52"
        >
          <Swiper></Swiper>
        </div>
        <div class="bg-white dark:bg-zinc-800 text-ellipsis overflow-hidden">
          <Introduce :user="user" class="rounded" />
        </div>
      </div>
      <!-- 文章列表 -->
      <section class="lg:pt-7 pt-2 w-full">
        <div class="flex justify-between h-[1000px] overflow-y-hidden w-full">
          <div
            class="lg:w-[70%] overflow-hidden dark:bg-zinc-800 w-full h-full bg-white border rounded"
          >
            <div
              class="flex dark:text-red-50 border-b justify-between w-full py-2 dark:bg-zinc-800 bg-zinc-50"
            >
              <div class="border-l-2 border-l-purple-500 pl-2">文章列表</div>
              <div class="flex items-center cursor-pointer" @click="showFilter">
                条件筛选<Icon
                  icon="material-symbols:filter-alt"
                  class="ml-2"
                ></Icon>
              </div>
            </div>
            <!-- 过滤列表 -->
            <Transition>
              <div v-show="isFilter" class="h-40 w-full p-2">
                <div class="grid grid-cols-3 grid-row-1 w-full h-15">
                  <input
                    type="text"
                    placeholder="filter title"
                    class="input dark:bg-zinc-600"
                    v-model="search"
                  />
                  <input
                    type="number"
                    class="ml-2 dark:bg-zinc-600"
                    v-model="indexV"
                  />
                  <button
                    class="btn dark:hover:bg-zinc-600 btn-outline btn-info ml-2"
                    @click="handleScrollTo"
                  >
                    跳转
                  </button>
                </div>
                ......
              </div>
            </Transition>
            <!-- 虚拟列表 -->
            <div
              class="w-full dark:bg-black dark:text-green-50 h-[calc(100%-2.65rem)]"
              v-bind="(containerProps as any)"
            >
              <div v-bind="wrapperProps">
                <NuxtLink
                  v-for="item in list"
                  :key="'Nav' + item.index + item.data.title"
                  class="h-20 border p-2 m-2 flex"
                  :to="'/blog' + item.data._path"
                >
                  <img
                    class="h-full w-28 object-cover"
                    :src="item.data.img"
                    alt=""
                  />
                  <div class="ml-2">
                    title:
                    <span class="rainbow-text">{{ item.data.title }}</span>
                  </div>
                </NuxtLink>
              </div>
            </div>
          </div>
          <aside class="w-[28%] lg:block hidden">
            <!-- 公告 -->
            <div
              class="prose dark:text-yellow-50 lg:prose-xs border h-72 mb-2 w-full rounded dark:bg-black bg-zinc-50 p-2"
            >
              <h1
                class="text-center dark:text-yellow-50 text-xl rainbow-text font-bold"
              >
                关于本站
              </h1>
              <p class="indent-8">
                互相学习，成长，相关源代码可以在我的<span class="text-blue-400"
                  >github</span
                >找到，如果您有什么好的建议或者想法可以添加我的个人微信
                ，提出您宝贵的意见。也欢迎各位有志之士加入学习群，加我微信邀请您进群进行自律打卡，提供大量<span
                  class="text-yellow-500"
                  >稀有</span
                >主流学习资料。 更有大佬带您一起学习，当然群主是个<span
                  class="text-red-300"
                  >菜鸟</span
                >，遇到更菜的也可以适当解答。
              </p>
            </div>
            <div
              class="w-full bg-zinc-50 border dark:text-yellow-50 dark:bg-black h-[1000px] p-2"
            >
              <h1
                class="text-center rainbow-text dark:text-yellow-50 text-xl font-bold"
              >
                开发工具
              </h1>
              <ul class="h-full w-full">
                <li
                  class="w-full h-32 p-2 border rounded"
                  v-for="item in utils"
                  :key="item.id"
                >
                  <NuxtLink
                    class="w-full h-full overflow-hidden flex"
                    target="_blank"
                    :to="item.url"
                  >
                    <img
                      class="w-[40%] h-full bg-cover bg-center"
                      :src="item.img"
                      alt=""
                    />
                    <div class="prose w-[60%] ml-2">
                      <h4 class="text-center dark:text-red-50">
                        {{ item.title }}
                      </h4>
                      <p class="dark:text-yellow-50">{{ item.text }}</p>
                    </div>
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </main>
    <TheFooter />
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.3s;
}

.v-enter-from,
.v-leave-to {
  transform: translateY(-50px);
  opacity: 0;
}
</style>
