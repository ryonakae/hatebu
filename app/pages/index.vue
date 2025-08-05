<template>
  <EntryList
    :type="'hotentry'"
    :category="'all'"
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
</script>
