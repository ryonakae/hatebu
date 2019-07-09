import Vue from 'vue'
import Swiper from 'swiper'

declare global {
  type DisplayMode = 'hotentry' | 'entrylist'
  interface Categories {
    [key: string]: string
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    swiper: Swiper
  }
}
