import { defineStore } from 'pinia'

export const useCommonStore = defineStore('commonStore', {
  state: (): State => ({
    loading: false,
    categories: {
      all: '総合',
      general: '一般',
      social: '世の中',
      economics: '政治と経済',
      life: '暮らし',
      knowledge: '学び',
      it: 'テクノロジー',
      fun: 'おもしろ',
      entertainment: 'エンタメ',
      game: 'アニメとゲーム',
    },
    currentCategory: 'all',
    displayMode: 'hotentry',
    rssData: null,
  }),
  actions: {
    async changeDisplayMode(options: GetEntryOptions) {
      console.log('changeDisplayMode', options)

      if (options.mode === this.displayMode) {
        console.log('changeDisplayMode: aborted')
        return
      }

      const json = await useGetEntry(options)
      this.rssData = json

      window.scrollTo(0, 0)

      this.displayMode = options.mode
    },
    moveAdjacentCategory(side: 'previous' | 'next') {
      const categories = Object.keys(this.categories)
      const currentIndex = categories.indexOf(this.currentCategory)

      let sideIndex!: number

      if (side === 'previous') {
        sideIndex = currentIndex - 1

        if (sideIndex < 0) {
          sideIndex = categories.length - 1
        }
      }
      else if (side === 'next') {
        sideIndex = currentIndex + 1

        if (sideIndex > categories.length - 1) {
          sideIndex = 0
        }
      }

      const sideCategory = categories[sideIndex]

      navigateTo('/' + sideCategory)
    },
  },
})
