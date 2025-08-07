import { defineStore } from 'pinia'

export const useCommonStore = defineStore('commonStore', {
  state: (): State => ({
    loading: false,
    entryType: 'hotentry',
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
    currentCategory: null,
  }),
  actions: {
    moveAdjacentCategory(side: 'previous' | 'next') {
      // nullを含む全ての選択肢の配列を作成（「すべて」→ 各カテゴリー の順）
      const allCategories: (Category | null)[] = [null, ...(Object.keys(this.categories) as Category[])]

      // 現在のcurrentCategoryのインデックスを取得
      const currentIndex = allCategories.indexOf(this.currentCategory)

      let sideIndex: number

      if (side === 'previous') {
        sideIndex = currentIndex - 1
        if (sideIndex < 0) {
          sideIndex = allCategories.length - 1 // 最後の要素へ
        }
      }
      else { // next
        sideIndex = currentIndex + 1
        if (sideIndex >= allCategories.length) {
          sideIndex = 0 // 最初の要素へ
        }
      }

      const targetCategory = allCategories[sideIndex]

      // nullの場合は'/'（すべて）に、そうでなければ各カテゴリーページに移動
      if (targetCategory === null) {
        navigateTo('/')
      }
      else {
        navigateTo(`/${this.entryType}/${targetCategory}`)
      }
    },
  },
})
