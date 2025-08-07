<template>
  <div
    v-if="!rssData"
    class="loading"
  >
    <span>読み込み中…</span>
  </div>

  <EntryList
    v-else
    :type="route.params.type as EntryType"
    :category="route.params.category as Category"
    :data="rssData"
  />
</template>

<script setup lang='ts'>
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

// クライアントサイドでのみページをfetchする（キャッシュさせるため）
if (import.meta.client) {
  const pathsToFetch = (() => {
    if (route.path === '/' || route.path === '/hotentry/all') {
      return ['/', '/hotentry/all']
    }
    else {
      return [route.path]
    }
  })()

  pathsToFetch.forEach((path) => {
    useFetch(path, {
      method: 'HEAD',
      server: false,
      onRequest: () => {
        console.log('useFetch:', path)
      },
    })
  })
}
</script>

<style scoped>
.loading {
  min-height: calc(100svh - var(--header-height) - var(--nav-height));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & span {
    font-size: var(--fontsize-nav);
    color: var(--color-sub);
  }
}
</style>
