<template>
  <EntryList
    :type="'hotentry'"
    :category="'all'"
    :display-entries="5"
    :data="rssData!"
  />
</template>

<script setup lang="ts">
useHead({
  meta: [
    { name: 'robots', content: 'index,follow' },
  ],
  link: [
    { rel: 'canonical', href: siteInfo.url },
  ],
})

// エントリーを取得
const { data: rssData, error } = await useAsyncData(
  'entries-hotentry-all',
  () => useGetEntry({
    type: 'hotentry',
    category: 'all',
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
