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
      content: route.params.type === 'hotentry' && route.params.category === 'all'
        ? 'noindex,follow' // /hotentry/all のみ
        : 'noindex,nofollow,noarchive', // その他すべて
    },
  ],
  link: [
    {
      rel: 'canonical',
      href: route.params.type === 'hotentry' && route.params.category === 'all'
        ? siteInfo.url // /hotentry/all のcanonicalはルートに向ける
        : `${siteInfo.url}/${route.params.type}/${route.params.category}`, // その他は自分のURL
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

// クライアントサイドでのみページをfetchする
// ブラウザ上でのページ遷移は、 /api へリクエストされるが /<route.path> へはリクエストされない
// それをVercelに無理やりキャッシュさせる
if (import.meta.client) {
  useFetch(route.path, {
    method: 'HEAD',
    server: false,
    onRequest: () => {
      console.log('useFetch:', route.path)
    },
  })
}

// Methods
function getLinkText() {
  const categoryName = store.categories[route.params.category as Category]
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
