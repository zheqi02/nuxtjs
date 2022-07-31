<script setup lang="ts">
// 获取文章路径并把逗号替换成/
const slug = useRoute().params.slug.toString().replace(/,/g, '/')

// 获取文章内容
const { data: blog } = await useAsyncData(slug, () => {
  return queryContent(slug).findOne()
})

// 获取目录列表
const toc = computed(() => {
  if (!blog.value) return []
  const items = blog.value?.excerpt?.children
  if (!items) return []
  const toc = []
  const tags = ['h2', 'h3', 'h4', 'h5', 'h6']
  items.forEach(
    (item: { tag: string; props: { id: { toString: () => string } } }) => {
      if (tags.includes(item.tag)) {
        toc.push({
          id: item.props.id,
          title: item.props.id.toString().replace(/-/g, ' '),
          depth: Number(item.tag.replace(/h/g, ''))
        })
      }
    }
  )
  return toc
})

useHead({
  title: `${blog.value.title}`
})

</script>

<template>
  <!-- 文章主体 -->
  <article
    class="dark:text-white dark:bg-zinc-800 pt-10 max-w-max overflow-x-hidden lg:pt-20 flex items-start lg:space-x-10 px-[5%] lg:px-[10%]"
  >
    <div class="w-[370px] hidden lg:block">
      <div
        v-if="blog.excerpt"
        class="dark:bg-black w-[250px] p-5 fixed top-24 border rounded-md bg-white"
      >
        <h2 class="text-sm font-bold mb-4">Table Of Contents</h2>
        <ul class="space-y-2">
          <template v-for="(t, k) in toc" :key="`toc-item-${k}`">
            <li>
              <NuxtLink
                :class="{
                  'text-sm ml-4': t.depth == 2,
                  'text-[13px] ml-6': t.depth > 2
                }"
                class="capitalize truncate"
                :to="`#${t.id}`"
                >{{ t.title }}</NuxtLink
              >
            </li>
          </template>
        </ul>
      </div>
    </div>
    <ClientOnly>
      <!-- 渲染文章内容 -->
      <ContentRenderer
        class="dark:text-white prose lg:prose-base prose-sm prose-slate pr-7 blog-link w-screen lg:max-w-none"
        :value="blog"
      >
        <template #empty>
          <p>No content found.</p>
        </template>
      </ContentRenderer>
    </ClientOnly>
  </article>
</template>

<style scoped>
.blog-link {
  @apply prose-a:text-primary before:prose-headings:content-['#'] before:prose-headings:mr-1 before:prose-headings:text-primary before:prose-h1:content-[''];
}
</style>
