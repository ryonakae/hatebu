import { defineStore } from 'pinia'

export const useCommonStore = defineStore('commonStore', {
  state: (): State => ({
    loading: false,
    currentCategory: null,
  }),
  actions: {
    moveAdjacentCategory(side: 'previous' | 'next') {
      const route = useRoute()

      // ルートパス（/）の特別処理
      if (!route.params.type) {
        if (side === 'next') {
          navigateTo(`/hotentry/${categoryKeys[0]}`) // all
        }
        else {
          navigateTo(`/hotentry/${categoryKeys[categoryKeys.length - 1]}`) // game
        }
        return
      }

      // 循環順序を定義: type only → all → その他のカテゴリー → type only
      const cycleOrder: (Category | null)[] = [null, ...categoryKeys]

      // 現在の位置を取得
      const currentIndex = cycleOrder.indexOf(this.currentCategory)

      let targetIndex: number
      if (side === 'previous') {
        targetIndex = currentIndex - 1
        if (targetIndex < 0) {
          targetIndex = cycleOrder.length - 1
        }
      }
      else { // next
        targetIndex = currentIndex + 1
        if (targetIndex >= cycleOrder.length) {
          targetIndex = 0
        }
      }

      const targetCategory = cycleOrder[targetIndex]

      // ナビゲーション
      if (targetCategory === null) {
        navigateTo(`/${route.params.type}`)
      }
      else {
        navigateTo(`/${route.params.type}/${targetCategory}`)
      }
    },
  },
})
