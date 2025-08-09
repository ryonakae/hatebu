import { defineStore } from 'pinia'

export const useCommonStore = defineStore('commonStore', {
  state: (): State => ({
    loading: false,
    currentCategory: null,
  }),
  actions: {
    moveAdjacentCategory(side: 'previous' | 'next') {
      const route = useRoute()

      // nullを含む全ての選択肢の配列を作成（「すべて」→ 各カテゴリー の順）
      const allCategories: (Category | null)[] = [null, ...categoryKeys]

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
        navigateTo(`/${route.params.type}`)
      }
      else {
        navigateTo(`/${route.params.type}/${targetCategory}`)
      }
    },
  },
})
