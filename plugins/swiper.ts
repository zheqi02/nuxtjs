import { Scrollbar, A11y, Autoplay } from 'swiper'

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/scrollbar'

export default defineNuxtPlugin(NuxtApp => {
  NuxtApp.vueApp.component('swiper', Swiper)
  NuxtApp.vueApp.component('swiper-slide', SwiperSlide)
  return {
    provide: {
      modules: [Scrollbar, A11y, Autoplay]
    }
  }
})
