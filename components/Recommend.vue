<template>
  <div class="flex flex-col items-center justify-center">
    <h1 class="text-center text-4xl uppercase font-semibold mb-10">
      View website description?
    </h1>
    <div class="text-center p-0.5 rounded bg-white inline-block">
      <!-- The button to open modal -->
      <label
        for="my-modal-4"
        class="cursor-pointer block rounded px-5 py-3 w-full h-full bg-slate-900 text-white dark:hover:bg-slate-800 hover:bg-white hover:text-slate-900 dark:hover:text-green-50 transition-all"
        >To description</label
      >

      <!-- Put this part before </body> tag -->
      <input type="checkbox" id="my-modal-4" class="modal-toggle" />
      <label for="my-modal-4" class="modal cursor-pointer">
        <label
          class="modal-box relative dark:bg-black text-black dark:text-white"
          for=""
        >
          <h3 class="text-lg font-bold">网站问题简单介绍</h3>
          <p class="py-4">
            首先跳转问题，有的时候跳转不了或者反应缓慢，不是我逻辑应该是
            <span class="bg-red-200 rounded text-white">@nuxt/content</span>
            await查询数据返回的问题,
            在微信浏览器的代码块背景丢失问题，这个背景是content提供的所以如果微信浏览器的
            话就开暗色看代码块
          </p>
        </label>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style></style>
