<script setup lang="ts">

const { data: products } = await useAsyncData('products', () => {
  return queryContent('project').find()
})

const categories = products.value[0].body.reduce((acc, product) => {
  if (!acc.includes(product.category)) {
    acc.push(product.category)
  }
  return acc
}, [])
//var used to store the active category
const activeCategory = ref(null)
// function used to set the active category
const setCategory = category => {
  activeCategory.value = category
  useRouter().push({
    query: {
      category: category
    }
  })
}
// set category on mount if it exist in query
onMounted(() => {
  if (useRoute().query.category) {
    activeCategory.value = useRoute().query.category
  }
})
// function used to format the price
const formatPrice = price => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price)
}
// function used to filter the products by category
const filterProducts = computed(() => {
  if (!activeCategory.value) {
    return products.value[0].body
  }
  return products.value[0].body.filter(product => {
    return product.category.toLowerCase() == activeCategory.value.toLowerCase()
  })
})
// Set header
useHead({
  title: 'Content Project'
})
</script>

<template>
  <div>
    <main>
      <section class="lg:px-[15%] px-[5%] pt-20 dark:bg-black ">
        <h1
          class="lg:text-5xl text-2xl leading-normal font-semibold text-center"
        >
          Stay Up To Date With The
        </h1>
        <h1
          class="lg:text-6xl text-4xl text-center leading-normal font-bold rainbow-text"
        >
          Latest prevalent Trends
        </h1>

        <div class="lg:mt-20 mt-10">
          <h1 class="dark:text-green-50 lg:text-lg font-medium mb-5">
            Filter Category
            <button
              v-if="activeCategory"
              @click="setCategory(null)"
              class="dark:bg-slate-800 dark:text-yellow-100 px-3 rounded-sm text-[13px] capitalize bg-gray-200 ml-5"
            >
              Clear &times;
            </button>
          </h1>
          <div class="flex flex-wrap l items-center lg:space-x-5 mb-5">
            <template v-for="(c, i) in categories" :key="`categroy-${i}`">
              <button
                @click="setCategory(c)"
                :class="{
                  'bg-primary-100 text-primary': c == activeCategory,
                  ' bg-gray-200': c !== activeCategory
                }"
                class="dark:bg-slate-800 dark:text-yellow-100 px-3 py-2 rounded-sm text-[13px] capitalize shrink-0 mr-4 mb-4 lg:mr-0 lg:mb-0"
              >
                {{ c }}
              </button>
            </template>
          </div>
          <div class=" grid grid-cols-1 lg:grid-cols-4 gap-10 lg:mt-20">
            <template
              v-for="(p, i) in filterProducts"
              :key="`product-${i}-${p.id}`"
            >
              <Discount
                class="dark:bg-slate-800 lg:col-span-2 rounded bg-slate-900 text-white p-10"
                v-if="i === 0 && !activeCategory"
              />
              <NuxtLink
                :to="`/project/${p.id}`"
                :class="{ 'lg:col-start-3': i === 0 && !activeCategory }"
                class="rounded-md bg-white hover:shadow-lg transition-all hover:cursor-pointer"
              >
                <img
                  :src="p.image"
                  :alt="p.title"
                  class="w-full h-[300px] object-contain object-center"
                />
                <div class="p-3">
                  <h2 class="text-xs">{{ p.title }}</h2>
                  <p class="font-bold text-sm mt-2">
                    {{ formatPrice(p.price) }}
                  </p>
                </div>
              </NuxtLink>
            </template>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style></style>
