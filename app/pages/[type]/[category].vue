<template>
  <EntryList
    :type="route.params.type as EntryType"
    :category="route.params.category as Category"
    :data="rssData!"
  />
</template>

<script setup lang='ts'>
const route = useRoute()

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
</script>
