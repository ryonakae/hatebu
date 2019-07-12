import Vue from 'vue'
import Swiper from 'swiper'

declare global {
  type DisplayMode = 'hotentry' | 'entrylist'

  interface Categories {
    all: '総合'
    general: '一般'
    social: '世の中'
    economics: '政治と経済'
    life: '暮らし'
    knowledge: '学び'
    it: 'テクノロジー'
    fun: 'おもしろ'
    entertainment: 'エンタメ'
    game: 'アニメとゲーム'
  }

  interface GetEntryOptions {
    mode: DisplayMode
    category: keyof Categories
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    swiper: Swiper
  }
}
