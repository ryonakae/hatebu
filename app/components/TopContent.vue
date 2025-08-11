<template>
  <EntryLoading v-if="!categoriesData" />

  <div
    v-else
    class="categories"
  >
    <div
      v-for="({ category, data }, index) in categoriesData"
      :key="category"
    >
      <CommonDivider v-if="index > 0" />
      <EntryList
        :type="route.params.type as EntryType || 'hotentry'"
        :category="category"
        :display-count="getDisplayCount(category)"
        :data="data!"
      />
      <div class="categories-link">
        <NuxtLink
          :to="`/${route.params.type as EntryType || 'hotentry'}/${category}`"
        >
          {{ getLinkText(category) }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const store = useCommonStore()
const route = useRoute()

// currentCategoryを設定
store.currentCategory = null

// 全カテゴリーのエントリーを並行取得
const { data: categoriesData, error } = await useAsyncData(
  `entries-${route.params.type}-all-categories`,
  async () => {
    // 各カテゴリーに対してuseGetEntryを並行実行
    const promises = categoryKeys.map(category =>
      useGetEntry({
        type: route.params.type as EntryType || 'hotentry',
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

function getLinkText(category: Category) {
  // カテゴリ名を取得
  const categoryName = categories[category]

  // 指定されたパスパターンの場合は常に「人気エントリー」を表示
  const currentPath = route.path
  const isHotentry = currentPath === '/'
    || currentPath === '/hotentry'
  const entryTypeName = isHotentry
    ? '人気エントリー'
    : (route.params.type === 'hotentry' ? '人気エントリー' : '新着エントリー')

  return `${categoryName}の${entryTypeName} をもっと読む`
}
</script>

<style scoped>
.categories {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.categories-link {
  font-size: var(--fontsize-nav);
  padding-block: 12px;
  text-align: center;
}
</style>
