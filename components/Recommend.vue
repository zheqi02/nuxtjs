<template>
  <div class="flex flex-col items-center justify-center">
    <h1 class="text-center text-4xl uppercase font-semibold mb-10">
      View website description?
    </h1>
    <div class="text-center p-0.5 rounded bg-white inline-block">
      <!-- The button to open modal -->
      <label
        for="my-modal-4"
        class="block rounded px-5 py-3 w-full h-full bg-slate-900 text-white hover:bg-white hover:text-slate-900 transition-all"
        >To description</label
      >

      <!-- Put this part before </body> tag -->
      <input type="checkbox" id="my-modal-4" class="modal-toggle" />
      <label for="my-modal-4" class="modal cursor-pointer">
        <label class="modal-box relative dark:bg-black text-black dark:text-white" for="">
          <h3 class="text-lg font-bold">网站问题简单介绍</h3>
          <p class="py-4">
            首先跳转问题，有的时候跳转不了或者反应缓慢，不是我逻辑应该是 <span class="bg-red-200 rounded text-white">@nuxt/content</span> 的问题，其次这个搜索列表慢是因为使用了虚拟列表所以慢很正常，但是能保持10万条数据不卡
          </p>
        </label>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style></style>
