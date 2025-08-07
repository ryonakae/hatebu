<template>
  <div
    v-if="!categoriesData"
    class="loading"
  >
    <span>読み込み中…</span>
  </div>

  <div
    v-else
    class="categories-list"
  >
    <div
      v-for="({ category, data }, index) in categoriesData"
      :key="category"
    >
      <CommonDivider v-if="index > 0" />
      <EntryList
        :type="'hotentry'"
        :category="category"
        :display-count="getDisplayCount(category)"
        :data="data!"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const store = useCommonStore()

useHead({
  meta: [
    { name: 'robots', content: 'index,follow' },
  ],
  link: [
    { rel: 'canonical', href: siteInfo.url },
  ],
})

// currentCategoryを設定
store.currentCategory = null

// 全カテゴリーのエントリーを並行取得
const { data: categoriesData, error } = await useAsyncData(
  'entries-all-categories',
  async () => {
    // categoriesオブジェクトから全カテゴリーのキーを取得
    const categoryKeys = Object.keys(store.categories) as Category[]

    // 各カテゴリーに対してuseGetEntryを並行実行
    const promises = categoryKeys.map(category =>
      useGetEntry({
        type: 'hotentry',
        category,
      }),
    )

    const results = await Promise.all(promises)

    // カテゴリーとデータのペアを返す
    return categoryKeys.map((category, index) => ({
      category,
      data: results[index],
    }))
  },
  {
    server: true,
    default: () => [],
  },
)
if (error.value) {
  console.log(error.value)
  throw createError({
    statusCode: error.value.statusCode,
    statusMessage: error.value.statusMessage,
  })
}

// Methods
function getDisplayCount(category: Category) {
  if (category === 'all') {
    return 10
  }
  else {
    return 5
  }
}
</script>

<style scoped>
.categories-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
