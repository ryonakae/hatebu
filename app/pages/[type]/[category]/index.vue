<template>
  <EntryLoading v-if="!rssData" />

  <div
    v-else
  >
    <EntryList
      :type="route.params.type as EntryType"
      :category="route.params.category as Category"
      :data="rssData"
    />

    <div class="link">
      <NuxtLink
        :to="`https://b.hatena.ne.jp/${route.params.type}/${route.params.category}`"
        external
        target="_blank"
      >
        {{ getLinkText() }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const store = useCommonStore()

useHead({
  meta: [
    {
      name: 'robots',
      content: 'noindex,nofollow,noarchive',
    },
  ],
  link: [
    {
      rel: 'canonical',
      href: `${siteInfo.url}/${route.params.type}/${route.params.category}`, // 自分自身のURLにcanonicalを設定
    },
  ],
})

// currentCategoryを設定
store.currentCategory = route.params.category as Category

// エントリーを取得
const { data: rssData, error } = await useAsyncData(
  `entries-${route.params.type}-${route.params.category}`,
  () => useGetEntry({
    type: route.params.type as EntryType,
    category: route.params.category as Category,
  }),
  {
    server: true,
    default: () => null,
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
function getLinkText() {
  const categoryName = categories[route.params.category as Category]
  const entryTypeName = route.params.type === 'hotentry' ? '人気エントリー' : '新着エントリー'
  return `はてブ公式で ${categoryName}の${entryTypeName} をもっと読む`
}
</script>

<style scoped>
.link {
  font-size: var(--fontsize-nav);
  padding-block: 12px;
  text-align: center;
}
</style>
