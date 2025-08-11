<template>
  <TopContent />
</template>

<script setup lang="ts">
const route = useRoute()

useHead({
  meta: [
    {
      name: 'robots',
      content: route.params.type === 'hotentry'
        ? 'noindex,follow' // /hotentry は / と同じ内容なのでfollowを許可
        : 'noindex,nofollow,noarchive', // /entrylist はカテゴリページと同じ扱い
    },
  ],
  link: [
    {
      rel: 'canonical',
      href: route.params.type === 'hotentry'
        ? siteInfo.url // /hotentry は / と同じ内容なのでルートに向ける
        : `${siteInfo.url}/${route.params.type}`, // /entrylist は自分のURL
    },
  ],
})
</script>
