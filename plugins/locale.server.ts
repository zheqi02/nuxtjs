import { defineNuxtPlugin, useState } from '#app'

export default defineNuxtPlugin((nuxt) => {
  // 获取语言环境
	const locale = useState('locale', () => nuxt.ssrContext.event.req.headers['accept-language']?.split(',')[0])
})
