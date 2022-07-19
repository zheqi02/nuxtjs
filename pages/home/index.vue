<script setup lang="ts">
import { Icon } from '@iconify/vue'
useHead({
  title: 'ZheQi Home'
})

const { $modules } = useNuxtApp()
const { data: user } = await useFetch('/api/user')

interface Imgs {
  url: string
  title: string
}

const imgs: Imgs[] = [
  {
    url: 'https://api.qicaiyun.top/ercy/api.php',
    title: '第一张'
  },
  {
    url: 'https://api.ghser.com/random/pc.php',
    title: '第二张'
  },
  {
    url: 'http://api.btstu.cn/sjbz/?lx=dongman',
    title: '第三张'
  },
  {
    url: 'https://api.ixiaowai.cn/api/api.php',
    title: '第四张'
  },
  {
    url: 'https://api.btstu.cn/sjbz/?lx=suiji',
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

let isFilter = $ref(false)

const showFilter = () => {
  isFilter = !isFilter
}

let search = $ref('')
let indexV = $ref(0)
// 使用虚拟列表
const allItems = Array.from(Array(99999).keys()).map(i => ({
  height: i % 2 === 0 ? 42 : 84,
  size: i % 2 === 0 ? 'small' : 'large'
}))
const filteredList = computed(() =>
  allItems.filter(i => i.size.startsWith(search.toLowerCase()))
)
const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(
  filteredList,
  {
    itemHeight: 22
  }
)
const handleScrollTo = () => {
  if(indexV >= 0)
  scrollTo(indexV)
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
    url: 'https://tail-animista.vercel.app/play/basic/scale-up/scale-up-center',
    img: 'https://api.ixiaowai.cn/api/api.php',
    title: 'Tailanimista',
    text: '这是一个Tailwindcss的动画生成工具'
  },
  {
    id: '2',
    url: 'https://picsum.photos/',
    img: 'https://picsum.photos/200/300',
    title: 'Picsum',
    text: '这是一个图片API生成工具'
  }
]
</script>

<template>
  <div class="lg:px-[15%] px-[5%] w-screen overflow-x-hidden">
    <main class="pt-[4.5rem] w-full">
      <!-- 头上三个大板块 -->
      <div
        class="grid lg:grid-cols-3 grid-cols-1 lg:grid-rows-1 grid-rows-3 lg:gap-4 lg:h-64 w-full"
      >
        <div
          class="bg-zinc-50 grid rounded overflow-hidden grid-cols-2 grid-rows-2 gap-4"
        >
          <div class="overflow-hidden rounded cursor-pointer">
            <img
              class="bg-cover bg-center hover:scale-150 transition-all"
              src="https://tva2.sinaimg.cn/large/87c01ec7gy1frx3t6m651j21hc0u07cj.jpg"
              alt=""
            />
          </div>
          <div class="overflow-hidden rounded cursor-pointer">
            <img
              class="bg-cover bg-center hover:scale-150 transition-all"
              src="https://tva4.sinaimg.cn/large/0072Vf1pgy1foxkfsdn3mj31hc0u0nhh.jpg"
              alt=""
            />
          </div>
          <div class="overflow-hidden rounded cursor-pointer">
            <img
              class="bg-cover bg-center hover:scale-150 transition-all"
              src="https://tva4.sinaimg.cn/large/0072Vf1pgy1foxkj1cgi7j31hc0u0n9m.jpg"
              alt=""
            />
          </div>
          <div class="overflow-hidden rounded cursor-pointer">
            <img
              class="bg-cover bg-center hover:scale-150 transition-all"
              src="https://tva1.sinaimg.cn/large/0072Vf1pgy1foxk7272z8j31kw0w0h0a.jpg"
              alt=""
            />
          </div>
        </div>
        <div class="bg-zinc-50 overflow-hidden rounded lg:h-full w-full h-52">
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
                <img :src="item.url" :alt="item.title" />
              </swiper-slide>
            </template>
          </swiper>
        </div>
        <div class="bg-white dark:bg-zinc-800">
          <Introduce :user="user" class="rounded" />
        </div>
      </div>
      <!-- 文章列表 -->
      <section class="lg:pt-7 pt-2 w-full">
        <div class="flex justify-between h-[1000px] overflow-y-hidden w-full">
          <div class="lg:w-[70%]  w-full h-full bg-zinc-50">
            <div
              class="lg:flex border-b lg:justify-between lg:w-full w-screen py-2 bg-zinc-50"
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
              <div v-if="isFilter" class="h-40 p-2 w-full">
                <div class="flex w-[60%]">
                  <input
                    type="text"
                    placeholder="Input search text"
                    class="input w-[80%] max-w-xs"
                    v-model="search"
                  />
                  <input type="number" class="ml-2 w-[12%]" v-model="indexV" />
                  <button class="ml-2 border text-center" @click="handleScrollTo">跳转</button>
                </div>
              </div>
            </Transition>
            <!-- 虚拟列表 -->
            <div
              class="w-full h-[calc(100%-42px)]"
              v-bind="(containerProps as any)"
            >
              <div v-bind="wrapperProps">
                <div
                  v-for="item in list"
                  :key="item.index"
                  class="h-20 border p-2 m-2"
                >
                  <div>Row: {{ item.data.size }}</div>
                </div>
              </div>
            </div>
          </div>
          <aside class="w-[28%] lg:block hidden">
            <!-- 公告 -->
            <div
              class="prose lg:prose-xs border h-72 mb-2 w-full rounded bg-zinc-50 p-2"
            >
              <h1 class="text-center text-xl font-bold">关于本站</h1>
              <p class="indent-8">
                互相学习，成长，这个网站遵守MIT开源协议,相关源代码可以在我的<span
                  class="text-blue-400"
                  >github</span
                >找到，如果您有什么好的建议或者想法可以添加我的个人微信
                ，提出您宝贵的意见。也欢迎各位有志之士加入学习群，加我微信邀请您进群进行自律打卡，提供大量<span
                  class="text-yellow-500"
                  >稀有</span
                >主流学习资料。 更有大佬带您一起学习，当然群主是个<span
                  class="text-red-300"
                  >菜鸟</span
                >，遇到更菜的也可以适当解答。
                学习的话拜托可以给个友情链接或者提示来源，谢谢！
              </p>
            </div>
            <div class="w-full bg-zinc-50 h-[1000px] p-2">
              <h1 class="text-center text-xl font-bold">开发工具</h1>
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
                      <h4 class="text-center">{{ item.title }}</h4>
                      <p>{{ item.text }}</p>
                    </div>
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </main>
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
